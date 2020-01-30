'use strict';

const express = require('express');
const router = express.Router();

const index = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Book Store",
        version: "0.0.0"
    });
});

module.exports = index;