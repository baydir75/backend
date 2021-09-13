const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema ({
    firstName: String,
    lastName: String,
    address: { type: mongoose.Types.ObjectId, ref: "Address" }
})

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
