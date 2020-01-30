'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRoute = require('./routers/index.route');
const bookRoute = require('./routers/book.route');

const url = 'mongodb://127.0.0.1:27017/book-store';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use('/', indexRoute);
app.use('/books', bookRoute);

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log(`we're connected!`);
});

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
