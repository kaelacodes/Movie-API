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
        "genre_description": "Adventure film is a genre that revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown. These films generally take place in exotic locations and play on historical myths."
    },
    {
        "genre_name" : "Comedy",
        "genre_description": "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter."
    },
    {
        "genre_name" : "Drama",
        "genre_description": "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters."
    },
    {
        "genre_name" : "Sci-Fi",
        "genre_description": "Science fiction, popularly shortened as sci-fi, is a genre of fiction that creatively depicts real or imaginary science and technology as part of its plot, setting, or theme. The fiction part of science fiction means, of course, that it's a fictional story—not a real-life account."
    }
];

let directors = [
    {
        "name": "Quentin Tarantino",
        "bio": "Quentin Tarantino is an American film director, writer, producer, and actor. His films are characterized by frequent references to popular culture and film genres, non-linear storylines, dark humor, stylized violence, extended dialogue, pervasive use of profanity, cameos and ensemble casts.",
        "birth year": "1963",
        "death year": null
    },
    {
        "name": "Martin Scorsese",
        "bio": "is an American film director, producer, screenwriter and actor. Scorsese emerged as one of the major figures of the New Hollywood era. He is the recipient of many major accolades, including an Academy Award, four BAFTA Awards, three Emmy Awards, a Grammy Award, three Golden Globe Awards, and two Directors Guild of America Awards. He has been honored with the AFI Life Achievement Award in 1997, the Film Society of Lincoln Center tribute in 1998, the Kennedy Center Honor in 2007, the Cecil B. DeMille Award in 2010, and the BAFTA Fellowship in 2012. Five of his films have been inducted into the National Film Registry by the Library of Congress as 'culturally, historically or aesthetically significant'.",
        "birth year": "1942",
        "death year": null
    },
    {
        "name": "Alfred Hitchcock",
        "bio": "Sir Alfred Hitchcock was an English filmmaker. He is widely regarded as one of the most influential figures in the history of cinema.[1] In a career spanning six decades, he directed over 50 feature films,[a] many of which are still widely watched and studied today. Known as the 'Master of Suspense', he became as well known as any of his actors thanks to his many interviews, his cameo roles in most of his films, and his hosting and producing the television anthology Alfred Hitchcock Presents (1955–65). His films garnered 46 Academy Award nominations, including six wins, although he never won the award for Best Director despite five nominations.",
        "birth year": "1899",
        "death year": "1980"
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
    res.json(movies);
});

//GET request for a specific movie by title
app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) => {
        return movie.title === req.params.title
    }));
});

//GET request for data about a specific genre
app.get('/genres/:genre_name', (req, res) => {
    res.json(genres.find((genre) => {
        return genre === req.params.genre
    }));
});

//GET request for data on a specific director
app.get('/directors/:name', (req, res) => {
    res.json(directors.find((director) => {
        return director === req.params.director
    }));
});

//POST request to add new user account
app.post('/users', (req, res) => {
    let newUser = req.body;
    if (!newUser.name){
        const message = 'Missing name in request body';
        res.status(400).send(message);
    } else {
        newUser.id = uuidv4();
        users.push(newUser);
        res.status(201).send(newUser);
    }
});

//PUT request to update user information
app.put('/users/:userID', (req, res) => {
    res.send('Successfully updated user information');
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
