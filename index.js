// Imports all required packages
const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid');

const app = express();

//Integrates Mongoose and defined models into REST API
const mongoose = require('mongoose');
const Models = require ('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//allows Mongoose to connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/myFlixApp'), {useNewUrlParser: true, useUnifiedTopology: true};

const accessLogStream = fs.createWriteStream(path.join(__dirname,'log.txt'), {flags:'a'});

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common', {stream: accessLogStream}));

//GET request for default resposnse at "/" endpoint
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
});

//GET request for all movies
app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);        
        });
});

//GET request for a specific movie by title
app.get('/movies/:title', (req, res) => {
    Movies.findOne({Title: req.body.Title})
        .then((movie) => {
            if(movie){
                return res.status(201).json(movie);
            }else{
                return res.status(400).send('Sorry, ' + req.body.Title + ' is not in our database!');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});

//GET request for data about a specific genre
app.get('/movies/:genre/:genre_name', (req, res) => {
    Movies.findOne({'Genre.Name': req.params.genre_name})
    .then((movie) => {
        res.status(201).json(movie.Genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//GET request for data on a specific director
app.get('/movies/:director/:director_name', (req, res) => {
    Movies.findOne({'Director.Name': req.params.director_name})
        .then((movie) => {
            res.status(201).json(movie.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Add new user account
app.post('/users', (req, res) => {
    Users.findOne({Username: req.body.Usesrname})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Pasword,
                        Email: req.body.Birthday
                    })
                    .then((user) => {res.status(201).json(user)})
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Get all users
app.get('/users', (req,res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);        
        });
});

//Get user by userername
app.get('/users/:Username', (req, res) => {
    Users.findOne({Username: req.params.Username})
    .then((user) => {
        res.jsjon(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Update user information, by username
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username}, 
        {$set:
            {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
            }
        },
        {new: true},
        (err, updatedUser) => {
            if(err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

//Update user by adding a movie to users list of favorite movies by username and movieID
app.put('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username},
        {$push:
            {FavoriteMovies: req.body.MovieID}
        },
        {new:true},
        (err, updatedUser) => {
            if(err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
    });
});

//DELETE request to remove movie from users list of favorite movies by username and movieID
app.delete('/users/:Username/:FavoriteMovies', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username},
        {$pull:
            {FavoriteMovies: req.body.MovieID}
        },
        {new:true},
        (err, updatedUser) => {
            if(err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
    });
});

//DELETE request to remove existing user account by username
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({Username: reqparams.Username})
        .then(user => {
            if(!user) {
                req.status(400).send(req.params.Username + ' was not found.');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
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
