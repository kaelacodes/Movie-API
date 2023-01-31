// Imports all required packages
const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname,'log.txt'), {flags:'a'});

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common', {stream: accessLogStream}));

let movies = [
    {
        "title": "Everything Everywhere All at Once",
        "movie_description": "placeholder",
        "release_year": "2022",
        "movie_genres": [
            { 
                "genre": "Adventure",
                "descriptionUrl": "placeholder"
            },
            { 
                "genre": "Sci-Fi",
                "descriptionUrl": "placeholder",
            }
        ],
        "movie_director":
        [
            { 
                "name": "Daniel Kwan",
                "bioUrl": "placeholder"
            },
            { 
                "director_name": "Daniel Schneinert",
                "bioUrl": "placeholder",
            }
        ],
        "imageUrl": "link to image"
    },
    {
        "title": "The Banshees of Inisherin",
        "movie_description": "placeholder",
        "release_year": "2022",
        "movie_genres": [
            { 
                "genre": "Comedy",
                "descriptionUrl": "placeholder"
            },
            { 
                "genre": "Drama",
                "descriptionUrl": "placeholder",
            }
        ],
        "movie_director": {
            "name": "Martin McDonagh",
            "bioUrl": "placeholder"
        },
        "imageUrl": "link to image"
    }
];

let genres = [
    {
        "genre_name" : "Adventure",
        "genre_description": "placeholder dexcription"
    },
    {
        "genre_name" : "Comedy",
        "genre_description": "placeholder dexcription"
    },
    {
        "genre_name" : "Drama",
        "genre_description": "placeholder dexcription"
    },
    {
        "genre_name" : "Sci-Fi",
        "genre_description": "placeholder dexcription"
    }
];

let directors = [
    {
        "name": "placeholder name",
        "bio": "placeholder bio",
        "birth year": "0000",
        "death year": "0000"
    },
    {
        "name": "placeholder name",
        "bio": "placeholder bio",
        "birth year": "0000",
        "death year": "0000"
    },
    {
        "name": "placeholder name",
        "bio": "placeholder bio",
        "birth year": "0000",
        "death year": "0000"
    }
];

let users = [
    {
        "userID": 1,
        "first_name": "Anne",
        "last_name": "Brown",
        "username": "anne234",
        "email_address": "anne234@email.com",
        "favorite_movies": []
    },
    {
        "userID": 2,
        "first_name": "George",
        "last_name": "Smith",
        "username": "george_smith",
        "email_address": "george_smith@email.com",
        "favorite_movies": []
    },
    {
        "userID": 3,
        "first_name": "Lucy",
        "last_name": "Doe",
        "username": "LucyGoosey84",
        "email_address": "lucygoosey84@email.com",
        "favorite_movies": []
    }
];

//GET request for default resposnse at "/" endpoint
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
});

//GET request for all movies
app.get('/movies', (req, res) => {
    res.send('Successful GET request for all movies')
});

//GET request for a specific movie by title
app.get('/movies/:title', (req, res) => {
    res.send('Successful GET request returning data on the requestd title.');
});

//GET request for data about a specific genre
app.get('/genres/:genre', (req, res) => {
    res.send('Successful GET request returning data about the requested genre.');
});

//GET request for data on a specific director
app.get('/directors/:name', (req, res) => {
    res.send('Successful GET request returning data about the requested director.');
});

//POST request to add new user account
app.post('/users', (req, res) => {
    res.send('Successfully added new user account.');
});

//PUT request to update user information
app.put('/users/:userID', (req, res) => {
    res.send('Successfully updated user information.');
});

//POST request to add movie to users list of favorite movies
app.post('/users/:userID/favorite_movies', (req, res) => {
    res.send('Successfully added movie to users favorites list.');
});

//DELETE request to remove movie from users list of favorite movies
app.delete('/users/:userID/favorite_movies', (req, res) => {
    res.send('Successfully removed movie from users favorites list.');
});

//DELETE request to remove existing user account
app.delete('/users/:userID', (req, res) => {
    res.send('Successfully removed user account.')
})

// error handler comes after all route calls and app.use, but before app.listen
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
