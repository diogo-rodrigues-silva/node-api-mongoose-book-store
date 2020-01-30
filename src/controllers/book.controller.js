'use strict';

const Book = require('../models/book.model');

exports.getAll = function (req, res, next) {
    console.log('Getting all books');
    Book.find({

    }).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
};

exports.getOne = function (req, res, next) {
    Book.findOne({
        _id: req.params.id
    }).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
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
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
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
        res.json(data).status(201);
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto',
            data: e
        });
    });
}

exports.delete = function (req, res, next) {
    Book.findByIdAndDelete({
        _id: req.params.id
    }).then(data => {
        res.json(data).status(201);
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto',
            data: e
        });
    })
}