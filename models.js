const {default: mongoose} = require("mongoose");
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    genre: {
        genre_name: String,
        genre_description: String
    },
    director: {
        name: String,
        bio: String,
        birth_year: Date,
        death_year: Date
    },
    featured: Boolean,
    imageUrl: String
});

let userSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type:String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    favorite_movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}],
    email: {type: String, required: true},
    birthday: {type: Date, required: true}
});

//Function that hashes submitted passwords
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

//Function that compares submitted hashed passwords with hashed passwords stored in database
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;