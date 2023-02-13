const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type:String, required: true},
    Genre: {
        Name: String,
        Description: String,
    },
    Director: {
        Name: String,
        Bio: String,
        BirthYear: Date,
        DeathYear: Date
    },
    Featured: Boolean,
    ImageUrl: String,
});

let userSchema = mongoose.Schema({
    FirstName: {type: String, required: true},
    LastName: {type:String, required: true},
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}],
    Email: {type: String, required: true},
    Birthday: {type: Date}
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;