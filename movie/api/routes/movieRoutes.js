var express = require('express')
var router = express.Router()

var movieController=require('../controller/moviesController')
var movieValidate=require('../validation/movieValidate')
// Retrieve all Movie
router.get('/', movieController.findAll)

// Create a new Movie
router.post('/',movieValidate.validateMovie, movieController.create)


// Retrieve a single Movie with Id
router.get('/:movieId', movieController.findOne);

// Update a Movie with Id
router.put('/:movieId', movieController.update);

// Delete a Movie with Id
router.delete('/:movieId', movieController.delete);

module.exports = router