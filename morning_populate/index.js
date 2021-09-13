const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env"
});
const studentModel = require("./models/student");
const addressModel = require("./models/address");
const app = express();
app.use(express.json());

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Connectez à la base de données MongoDB");
    });

const addressId = "613f44103c10429ddfdf387f";

app.post("/student", async (_req, res) => {
    await studentModel.create({
        address: addressId,
        firstName: "Baydir",
        lastName: "Aboudou",
    }
    );
    res.json({
        message: "OK",
    });
});

app.get("/student", async (req, res) => {
    const searchResult = await studentModel.findById("613f4f701c1a044fc2d61823").populate("address")
    res.json({
        message: "Ok",
        data: searchResult
    })
})

app.listen(process.env.PORT, () => {
    console.log("Connectez au bon port, moussaillon !");
});