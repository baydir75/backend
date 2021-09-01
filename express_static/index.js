const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: 'public/uploads/' });
const app = express();
const port = 8000;
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Ca marche ! ${port}`);
});

app.get("/", (req, res) => {
    res.send("Upload");
});

app.post("/user", upload.single('img'), (req, res) => {
    console.log(req.file);
    let username = [];
    username.push(req.query.name);
    console.log(username)
    res.json({
        message: "Ok",
    })
});