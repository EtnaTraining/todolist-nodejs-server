
var app = require('express').createServer();
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://tcaland:s1stem1@staff.mongohq.com:10010/example');

var Movie = mongoose.model('movies', new mongoose.Schema({
    title: String,
    year: Number
}));

   
app.get('/', function(req, res) {
     res.send('ToDo List test!');
});

app.get('/movies', function (req, res) {
    Movie.find({}, function (err, movies) {
        res.contentType('json');
        res.json({
            success: true,
            data: movies
        });
    });
});

app.put('/movies/:id', function(req, res){
    Movie.find({_id: req.params.id}, function (err, movies) {
        // update db
        var movie = movies[0];
        movie.set(req.body);
        movie.save(function (err) {
            res.contentType('json');
            res.json({
                success: !err,
                data: req.body
            });
        });
    });
});

app.post('/movies', function (req, res) {
    var newMovie = new Movie();
    var newMovieData = req.body;

    // remove the id which the client sends since it is a new Movie
    //delete newMovieData['_id'];
    newMovie.set(newMovieData);
    newMovie.save(function (err, movie) {
        res.contentType('json');
        res.json({
            success: !err,
            data: movie
        });
    });
});


app.del('/movies/:id', function(req, res){
    Movie.remove({_id: req.params.id}, function (err, movies) {
        res.contentType('json');
        res.json({
            success: !err,
            data: []
        });
    });
});




app.listen(14236);
