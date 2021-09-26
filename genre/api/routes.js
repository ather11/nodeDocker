var express = require('express')
var router = express.Router()

var genreRoutes=require('./routes/genreRoute')

router
    // Add a binding to handle '/tests'
    .get('/', function(){
        // render the /tests view
    })
    // Import my automated routes into the path '/tests/automated'
    // This works because we're already within the '/tests' route
    // so we're simply appending more routes to the '/tests' endpoint
    .use('/genre', genreRoutes);




module.exports = router