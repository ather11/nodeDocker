const express = require('express')
var mongoose = require('mongoose');
const bodyParser= require('body-parser')

const app = express();
require('dotenv').config();
var routes=require('./api/routes')
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/api', routes)

var mongoDB = process.env.MONGODB;

mongoose.connect(mongoDB, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




const PORT=process.env.PORT || 3000
var server=app.listen(PORT, () => {
    console.log(`Project app listening on port ${PORT}!`)
});

module.exports = server
