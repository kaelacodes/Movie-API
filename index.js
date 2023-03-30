// Imports all required packages
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const uuid = require('uuid');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;

//Integrates Mongoose and defined models into REST API
const mongoose = require('mongoose');
const Models = require ('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//allows Mongoose to connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/myFlixApp', { useNewUrlParser: true, useUnifiedTopology: true });

const accessLogStream = fs.createWriteStream(path.join(__dirname,'log.txt'), {flags:'a'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(morgan('common', {stream: accessLogStream}));

//Imports CORS module and defines allowed origins
const cors = require('cors');
let allowedOrigins = ['http;//localhost:8080', 'http://testsite.com'];

app.use(cors({
    origin: (origin, callback) => {
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            let message = 'The CORS policy for this application doesn"t allow access from origin' + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

//Imports 'auth.js' file
let auth = require('./auth')(app);

//Imports Passport module 'passport.js' file
const passport = require('passport');
require('./passport');

//Imports validation libray for Node.js/Express validation
const {check, validationResult} = require('express-validator');

//GET request for default resposnse at "/" endpoint
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
});

//GET request for all movies
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/movies/:title', passport.authenticate('jwt', {session:false}), (req, res) => {
    Movies.findOne({'title': req.params.title})
        .then((movie) => {
            if(movie){
                return res.status(201).json(movie);
            }else{
                return res.status(400).send('Sorry, ' + req.params.title + ' is not in our database!');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});

//GET request for data about a specific genre by genre name
app.get('/genre/:genre_name', passport.authenticate('jwt', {session:false}), (req, res) => {
    Movies.findOne({'genre.genre_name': req.params.genre_name})
        .then((movie) => {
            res.status(201).json(movie.genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//GET request for data about all movies of specific genre, by genre name
app.get('/movies/genre/:genre_name', passport.authenticate('jwt', {session:false}), (req, res) => {
    Movies.find({'genre.genre_name': req.params.genre_name})
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//GET request for data on all movies by a specific director, by directors name
app.get('/movies/director/:director_name', passport.authenticate('jwt', {session:false}), (req, res) => {
    Movies.find({'director.name': req.params.director_name})
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//GET request for data on a specific director, by directors name
app.get('/director/:director_name', passport.authenticate('jwt', {session:false}), (req, res) => {
    Movies.findOne({'director.name': req.params.director_name})
        .then((movie) => {
            res.status(201).json(movie.director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get all users
app.get('/users', passport.authenticate('jwt', {session:false}), (req,res) => {
    Users.find()
        .then((users) => {
            console.log(users)
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);        
        });
});

//Add new user account
app.post('/users', [
    check('username', 'Username is required.').isLength({min:5}),
    check('username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required.').not().isEmpty(),
    check('email', 'Email does not appear to be valid.').isEmail()
], (req, res) => {
    //Checks validation object for errors
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array() });
    }
    //Hashes password
    let hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOne({'username': req.body.username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.username + ' already exists');
            } else {
                Users
                    .create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
                        password: hashedPassword,
                        favorite_movies: req.body.favorite_movies,
                        email: req.body.email,
                        birthday: req.body.birthday
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

//Get user by userername
app.get('/users/:username', passport.authenticate('jwt', {session:false}), (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    Users.findOne({'username': req.params.username})
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Update user information, by username
app.put('/users/:username', passport.authenticate('jwt', {session:false}), [
    check('username', 'Username is required.').isLength({min:5}),
    check('username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required.').not().isEmpty(),
    check('email', 'Email does not appear to be valid.').isEmail()
], (req, res) => {
    //Checks validation object for errors
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    //Hashes password
    let hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOneAndUpdate({'username': req.params.username}, 
        {$set:
            {
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                birthday: req.body.birthday
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

//Add a movie to users list of favorite movies by username and movieId
app.post('/users/:username/favorite_movies/:MovieID', passport.authenticate('jwt', {session:false}), (req, res) => {
    Users.findOneAndUpdate({'username': req.params.username},
        {$push:
            {favorite_movies: req.params.MovieID}
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

//DELETE request to remove movie from users list of favorite movies by username and movieID
app.delete('/users/:username/favorite_movies/:MovieID', passport.authenticate('jwt', {session:false}), (req, res) => {
    Users.findOneAndUpdate({'username': req.params.username},
        {$pull:
            {favorite_movies: req.params.MovieID}
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
app.delete('/users/:username', passport.authenticate('jwt', {session:false}), (req, res) => {
    Users.findOneAndRemove({'username': req.params.username})
        .then(user => {
            if(!user) {
                req.status(400).send(req.params.username + ' was not found.');
            } else {
                res.status(200).send(req.params.username + ' was successfully deleted.');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET request for documentation
app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
    });

// error handler comes after all route calls and app.use, but before app.listen
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(port, '0.0.0.0', () => {
    console.log('Your app is listening on Port' + port);
});
