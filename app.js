'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Book = require('./models/book.model');

const url = 'mongodb://127.0.0.1:27017/book-store';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log(`we're connected!`);
});

app.get('/', function (req, res) {
	res.send('happy to be here!');
});

app.get('/books', function (req, res) {
	console.log('Getting all books');
	Book.find({}).exec(
		function (error, books) {
			if (error) {
				res.send(error);
			} else {
				console.log(books);
				res.json(books);
			}
		}
	);
});

app.get('/books/:id', function (req, res) {
	Book.findOne({
		_id: req.params.id
	}).exec(
		function (error, book) {
			if (error) {
				res.send(error);
			} else {
				console.log(book);
				res.json(book);
			}
		}
	)
});

app.post('/books', function (req, res) {
	console.log(`Creating a new book`);
	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		category: req.body.category
	});
	Book.create(book, function (error, book) {
		if (error) {
			res.send(error);
		} else {
			res.json(book);
		}
	});
});

app.put('/books/:id', function (req, res) {
	Book.findOneAndUpdate({
		_id: req.params.id
	},
		{
			$set: {
				title: req.body.title,
				author: req.body.author,
				category: req.body.category
			}
		},
		{
			upsert: true
		}).exec(
			function (error, book) {
				if (error) {
					res.send(error);
				} else {
					console.log(book);
					res.json(book).status(204);
				}
			}
		)

});

app.delete('/books/:id', function (req, res) {
	Book.findByIdAndDelete({
		_id: req.params.id
	}, function (error) {
	}).exec(
		function (error, book) {
			if (error) {
				res.send(error);
			} else {
				console.log(book);
				res.json(book).status(204);
			}
		}
	);
});

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
