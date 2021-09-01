const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: 'public/uploads/' });
const app = express();
const port = 8000;
app.use(express.static('public'));
app.use(cors());

app.listen(port, () => {
    console.log(`Ca marche ! ${port}`);
});

app.get("/", (req, res) => {
    res.send("Upload");
});

app.post("/", upload.single('img'), (req, res) => {
    console.log(req.file);
    fs.renameSync(req.file.path, path.join(req.file.destination, req.file.originalname));
    username = req.query.username;
    console.log(username);
    res.json({
        message: "Ok",
    });
});