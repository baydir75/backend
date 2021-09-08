const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env"
});
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

async function itemExists(req, res, next) {
    const authorToDelete = await Author.find({ name: req.params.name });
    console.log(authorToDelete);
    req.authorToDelete = authorToDelete;
    next();
};

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Connected to MongoDB !");
    });

const AuthorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    books: {
        type: Array,
        required: true
    }
});

const Author = mongoose.model("authors", AuthorsSchema);

app.get("/authors", async (req, res) => {
    const authors = await Author.find();

    res.json({
        message: "OK",
        data: authors
    });
});

app.get("/authors/:name", async (req, res) => {
    // 
    const authors = await Author.find({ name: req.params.name });

    res.json({
        message: "OK",
        data: authors
    });
});

app.post("/authors", async (req, res) => {
    await Author.create(req.body);

    res.json({
        message: "Ok"
    });
});

app.patch("/authors/:name/books", async (req, res) => {
    const author = await Author.find({ name: req.params.name });
    console.log(author[0].books);
    const books = author[0].books;
    books.push(req.body.name);
    res.json({
        message: "OK",
        data: books
    });
});

app.delete("/authors/:name", itemExists, async (req, res) => {
    console.log(req.authorToDelete[0].id);
    if (req.authorToDelete) {
        await Author.findByIdAndDelete(req.authorToDelete[0].id);
        res.json({
            message: "Author deleted",
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log("Connectez au bon port, moussaillon !");
});