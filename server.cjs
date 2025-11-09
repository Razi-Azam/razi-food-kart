const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// PUBLIC STATIC DIR
app.use(express.static("public"));

// Save image
app.post("/save-image", (req, res) => {
  const { fileName, base64 } = req.body;

  const data = base64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(data, "base64");

  fs.writeFile(`public/uploads/${fileName}`, buffer, err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.listen(5000, () => console.log("Image server running on port 5000"));
