'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: [true, "The name of the book is required"]
    },
    author: {
        type: String,
        required: [true, "The nome of the book is required"]
    },
    category: {
        type: String,
        required: [true, "The category of the book is required"]
    }
});

module.exports = mongoose.model('Book', BookSchema);