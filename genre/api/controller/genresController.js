'use strict';
var Genre=require('../models/genreModel');

// Create and Save a new Genre
exports.create = (req, res) => {


    const genre = new Genre({
        name: req.body.name || "Untitled",
        description: req.body.description
    });

    // Save Genre in the database
    genre.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Genre."
        });
    });
};

// Retrieve and return all genres from the database.
exports.findAll = (req, res) => {
    Genre.find()
        .then(genre => {
            res.send(genre);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving generes."
        });
    });
};

// Find a single genre with a genreId
exports.findOne = (req, res) => {
    Genre.findById(req.params.genreId)
        .then(genre => {
            if(!genre) {
                return res.status(404).send({
                    message: "Genre not found with id " + req.params.genreId
                });
            }
            res.send(genre);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Genre not found with id " + req.params.genreId
            });
        }
        return res.status(500).send({
            message: "Error retrieving genre with id " + req.params.genreId
        });
    });
};

// Update a genre identified by the genreId in the request
exports.update = (req, res) => {
    Genre.findByIdAndUpdate(req.params.genreId,{
                name: req.body.name || "Untitled",
                description: req.body.description
            }, {new: true})
        .then(genre => {
            if(!genre) {
                return res.status(404).send({
                    message: "Genre not found with id " + req.params.genreId
                });
            }
            res.send(genre);

        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Genre not found with id " + req.params.genreId
            });
        }
        return res.status(500).send({
            message: "Error retrieving genre with id " + req.params.genreId
        });
    });
};

// Delete a genre with the specified genreId in the request
exports.delete = (req, res) => {
    Genre.findByIdAndRemove(req.params.genreId)
        .then(genre => {
            if(!genre) {
                return res.status(404).send({
                    message: "Genre not found with id " + req.params.genreId
                });
            }
            return res.status(200).send({
                message: "Genre Deleted "
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Genre not found with id " + req.params.genreId
            });
        }
        return res.status(500).send({
            message: "Error retrieving genre with id " + req.params.genreId
        });
    });
};