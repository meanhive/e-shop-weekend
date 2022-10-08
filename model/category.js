const mongoose = require('mongoose');
const Category = new mongoose.Schema({
    catId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    collection: "category",
    timestamps: true
})

module.exports = mongoose.model("Category", Category)