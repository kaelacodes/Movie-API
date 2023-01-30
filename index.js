// Imports all required packages
const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();

let topTenMovies = [
    {title: 'Happy Gilmore'},
    {title: 'Step Brothers'},
    {title: 'Shawshank Redemption'},
    {title: 'The Banshees of Inisherin'},
    {title: 'Psycho'},
    {title: 'Some Like It Hot'},
    {title: 'Pulp Fiction'},
    {title: 'I Am Legend'},
    {title: 'Pretty In Pink'},
    {title: 'Everything, Everywhere, All At Once'}
];

const accessLogStream = fs.createWriteStream(path.join(__dirname,'log.txt'), {flags:'a'});

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('combined', {stream: accessLogStream}));

//GET request for default resposnse at "/" endpoint
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
});

//GET request for topTenMovies
app.get('/movies', (req,res) => {
    res.json(topTenMovies);
});

// error handler comes after all route calls and app.use, but before app.listen
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});