'use strict';
var Movie=require('../models/movieModel');
var mongoose = require('mongoose');

const axios=require('axios');


// Create and Save a new Movie
exports.create = (req, res) => {

if(req.body.genres)
    var genres = req.body.genres.map(s => mongoose.Types.ObjectId(s));

    const movie = new Movie({
        name: req.body.name || "Untitled",
        description: req.body.description,
        duration: req.body.duration,
        rating: req.body.rating,
        genres:genres,

    });

    // Save Movie in the database
    movie.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Movie."
        });
    });
};

// Retrieve and return all movies from the database.
exports.findAll = (req, res) => {
    Movie.find()
        .then(movie => {
            res.send(movie);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving movies."
        });
    });
};

// Find a single movie with a movieId

async function findGenreName(genreId){
    return axios.get("http://localhost:3000/api/genre/"+genreId).then(function (response) {
        return  response.data.name;

    }).catch(function (error) {
        console.log(error);
    });
}

exports.findOne = (req, res) => {
    Movie.findOne({_id:req.params.movieId})
        .then(async movie => {
            if(!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.movieId
                });
            }

            var genres= movie.genres.map(function(val, index){
                return findGenreName(val);
            });
            var genresArray =await Promise.all(genres);


            var movieDetail=JSON.parse(JSON.stringify(movie))

           movieDetail.genres=genresArray;

            res.send(movieDetail);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        return res.status(500).send({
            message: "Error retrieving movie with id " + req.params.movieId
        });
    });
};

// Update a movie identified by the movieId in the request
exports.update = (req, res) => {

    if(req.body.genres)
        var genres = req.body.genres.map(s => mongoose.Types.ObjectId(s));

    Movie.findByIdAndUpdate(req.params.movieId,{
        name: req.body.name || "Untitled",
        description: req.body.description,
        duration: req.body.duration,
        rating: req.body.rating,
        genres:genres,
    }, {new: true})
        .then(movie => {
            if(!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.movieId
                });
            }
            res.send(movie);

        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        return res.status(500).send({
            message: "Error retrieving movie with id " + req.params.movieId
        });
    });
};

// Delete a movie with the specified movieId in the request
exports.delete = (req, res) => {
    Movie.findByIdAndRemove(req.params.movieId)
        .then(movie => {
            if(!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.movieId
                });
            }
            return res.status(200).send({
                message: "Movie Deleted "
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        return res.status(500).send({
            message: "Error retrieving movie with id " + req.params.movieId
        });
    });
};