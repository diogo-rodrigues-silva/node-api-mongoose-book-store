'use strict';

const mongoose = require('mongoose');
const Book = require('../models/book.model');
const BOOKS = require('./books.mock').default;

console.log(BOOKS);

const url = 'mongodb://127.0.0.1:27017/book-store';

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(`we're connected!`);
    Book.insertMany(BOOKS, function (error) {
        console.error(`Error: ${error}`)
    });
});