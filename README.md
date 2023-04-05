# myFlix App (REST API)

## Table of Contents:
* Overview:
    * Project Brief
    * Key Features
    * API Endpoints
* Links
* Process:
    * Built With
    * Dependencies
    * How to Run

## Overview:
This project is the first of two steps in creating a full stack web application called myFlix. This stage of the overall project was to build all backend components of the application resulting in a functional and hosted REST API with both a users database, and a movies database. In the next stage of this project the frontend of the myFlix App will be built resulting in a fullstack web application for searching and saving movies via a registered user account.

### Objective:
To build the server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

### Key Features:
* Returns a list of ALL movies to the user
* Returns data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
* Returns data about a specific genre (description) by name/title (e.g., “Thriller”)
* Returns a list of movies of a specific genre by name/title (e.g., “Thriller”)
* Returns data about a director (bio, birth year, death year) by name
* Returns a list of movies by a specific director by name
* Returns a list of ALL users for admin purposes
* Allows new users to register
* Allows users to update their user info (username, password, email, date of birth)
* Allows users to add a movie to their list of favorites
* Allows users to remove a movie from their list of favorites
* Allows existing users to deregister

### API Endpoints:
* GET - /movies - Returns a list of ALL movies to the user
* GET - /movies/:title - Returns data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
* GET - /genre/:genre_name - Returns data about a specific genre (description) by name/title (e.g., “Thriller”)
* GET - /movies/genre/:genre_name - Returns a list of movies of a specific genre by name/title (e.g., “Thriller”)
* GET - /director/:director_name - Returns data about a director (bio, birth year, death year) by name
* GET - /movies/director/:director_name - Returns a list of movies by a specific director by name
* GET - /users - Returns a list of ALL users for admin purposes
* POST - /users - Allows new users to register
* PUT - /users/:username - Allows users to update their user info (username, password, email, date of birth)
* POST - /users/:username/favorite_movies/:MovieID - Allows users to add a movie to their list of favorites
* DELETE - /users/:username/favorite_movies/:MovieID - Allows users to remove a movie from their list of favorites
* DELETE - /users - Allows existing users to deregister

## Links:
* [Link](https://myflixapi-koyl.onrender.com/) to live web application

## Process:

### Built With:
* HTML
* JavaScript
* Node.js
    * https://nodejs.org/en/
* Node.js repl terminal
    * cd into correct directory and start Node.js repl terminal with node index.js
    * stop Node.js repl terminal with ctl c
    * log information is "processed by" Morgan middleware
* MongoDB
* Express
* React

### Dependencies:
* Express.js
    * server-side minimalist web framework for Node.js
    * https://www.npmjs.com/package/express
* Morgan Middleware
    * logs information to Node.js repl terminal (and to the log.txt)
    * https://www.npmjs.com/package/morgan
* Body Parser Middleware
    * reads the body of HTTP requests to get additional information not stored in the request URLs
    * https://www.npmjs.com/package/body-parser
* uuid Middleware
    * generates unique IDs
    * https://www.npmjs.com/package/uuid
* MongoDB and MongoDB Community Server
    * to build the document-based, non-relational database
    * https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
    * https://github.com/mongodb/homebrew-brew
    * MongoDB Communit Server will install the latest:
        * MongoDB Community Server
        * locally needs to run any time one wants to interact with the database, view the app or use Mongo Shell
        * start brew services start mongodb-community
        * stop brew services stop mongodb-community
    * Mongo Shell (local)
        * start MongoDB Community Server
        * run mongosh
        * exit with exit or quit()
        * stop MongoDB Community Server
    * MongoDB Database Tools
* Mongoose
    * to configure data models / schemas
    * https://www.npmjs.com/package/mongoose
    * (to install Mongoose, the MongoDB Server must be up)
* Postman
    * to test endpoints and API documentation
    * https://www.postman.com/
    * cd into correct directory and start Node.js repl terminal with node index.js
    * go to Postman (either browser or app)
    * test
* CORS
    * Cross-Origin Resource Sharing
    * to control which domains have access to the API
* bcrypt
    * to hash passwords
* express-validator
    * for server-side input validation
* jsonwebtoken
    * JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties
    * JWT.IO allows you to decode, verify and generate JWT
    * https://jwt.io/
* passport
    * Passport is authentication middleware for Node.js
    * A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more
    * https://www.passportjs.org/
* passport-jwt
    * This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions
    * http://www.passportjs.org/packages/passport-jwt/

### How to Run:
* clone project
* npm install
