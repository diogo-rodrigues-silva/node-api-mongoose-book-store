'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const indexRoute = require('./routers/index.route');
const bookRoute = require('./routers/book.route');

require('./db/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRoute);
app.use('/books', bookRoute);

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
