'use strict';

const httpStatus = require('http-status-codes');
const Book = require('../models/book.model');

exports.getAll = function (req, res, next) {
    console.log('Getting all books');
    Book.find({

    }).then(data => {
        res.status(httpStatus.OK).send(data);
    }).catch(error => {
        res.status(httpStatus.BAD_REQUEST).send(error);
    });
};

exports.getOne = function (req, res, next) {
    Book.findOne({
        _id: req.params.id
    }).then(data => {
        res.status(httpStatus.OK).send(data);
    }).catch(error => {
        res.status(httpStatus.BAD_REQUEST).send(error);
    });
}

exports.create = function (req, res, next) {
    console.log(`Creating a new book`);
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category
    });
    Book.create(
        new Book({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category
        })
    ).then(data => {
        res.status(httpStatus.OK).send(data);
    }).catch(error => {
        res.status(httpStatus.BAD_REQUEST).send(error);
    });
}

exports.update = function (req, res, next) {
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
        }
    ).then(data => {
        res.status(httpStatus.CREATED).send(data);
    }).catch(error => {
        res.status(httpStatus.BAD_REQUEST).send(error);
    });
}

exports.delete = function (req, res, next) {
    Book.findByIdAndDelete({
        _id: req.params.id
    }).then(data => {
        res.status(httpStatus.NO_CONTENT).send(data);
    }).catch(error => {
        res.status(httpStatus.BAD_REQUEST).send(error);
    })
}