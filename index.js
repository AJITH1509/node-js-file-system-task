const express = require("express");
const app = express();
const fs = require("fs");

const folderPath = "./Date-time";

const PORT = 4002;
app.get("/", (req, res) => {
  res.send("hello sir / Mam, Have a Nice Day");
});

//api for create date-time.txt files

app.post("/createFile", (req, res) => {
  const timestamp = new Date().toString();
  const filename = new Date().toISOString().replace(/:/g, "-") + ".txt";
  const content = timestamp;

  fs.writeFile(`${folderPath}/${filename}`, content, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error creating file");
    }

    return res.send("File created successfully");
  });
});

// api for get datas of each file

app.get("/files", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading folder");
    }

    const fileData = files.map((file) => {
      const content = fs.readFileSync(`${folderPath}/${file}`, "utf8");
      return {
        filename: file,
        content: content,
      };
    });

    return res.send(fileData);
  });
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
