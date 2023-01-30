// Imports all required packages
const express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    path = require('path'),
    morgan = require('morgan');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(_dirname,'log.txt'), {flags:'a'});

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
    {title: 'Accross The Universe'}
];

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('combines', {stream: accessLogStream}));

//GET request for topTenMovies
app.get('/movies', (req,res) => {
    res.json(topTenMovies);
});
//GET request for default resposnse at "/" endpoint
app.get('/', (req,res) => {
    res.send('Welcome to MyFlix!');
});

// error handler comes after all route calls and app.use, but before app.listen
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
