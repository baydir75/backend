const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env"
});
const userModel = require("./models/user");
const contactModel = require("./models/contact");
const app = express();

app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => {
        console.log("Connectez à la base de données");
    });

app.listen(process.env.PORT, () => {
    console.log("Connection réussie !");
});

app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 12);

    try {
        await userModel.create({ email: email, password: hashPassword });
    } catch (err) {
        return res.status(400).json({
            message: "A user with that email address already exists"
        });
    }

    res.json({
        data: req.body,
        message: "User created successfully"
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

    res.cookie("jwt", token, { httpOnly: true, secure: false });

    res.json({
        message: "Cookie"
    });

});

app.get("/contact", async (req, res) => {
    const searchResult = await contactModel.findById(token.id).populate("user")
    const listContact = searchResult.length()
    res.json({
        message: "Ok",
        data: searchResult,
        nb: listContact
    })
})

app.post("/contact", async (req, res) => {
    const { name, email, description, category } = req.body

    try {
        await contactModel.create({ email: email, name: name, description: description, category: category, userID: token.id })
    } catch (err) {
        return res.status(400).json({
            message: "Contact déjà existant"
        })
    }
})

app.put("/contact", async (req, res) => {
    
})