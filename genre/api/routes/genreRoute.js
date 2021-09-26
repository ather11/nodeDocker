var express = require('express')
var router = express.Router()

var genreController=require('../controller/genresController')
var genreValidate=require('../validation/genreValidate')
// Retrieve all Genre
router.get('/', genreController.findAll)

// Create a new Genre
router.post('/',genreValidate.validateGenre, genreController.create)


// Retrieve a single Genre with Id
router.get('/:genreId', genreController.findOne);

// Update a Genre with Id
router.put('/:genreId', genreController.update);

// Delete a Genre with Id
router.delete('/:genreId', genreController.delete);

module.exports = router