'use strict';

const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/book-store';

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log(`we're connected!`);
});