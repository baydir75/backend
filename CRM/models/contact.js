const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, ref: "user" },
    name: String,
    email: String,
    description: String,
    category: Number
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact