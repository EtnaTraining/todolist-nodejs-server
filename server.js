
var app = require('express').createServer();
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://tcaland:s1stem1@staff.mongohq.com:10010/example');

var movieModel = mongoose.model('movies', new mongoose.Schema({
    title: String,
    year: Number
}));

   
app.get('/', function(req, res) {
     res.send('ToDo List test!');
});

app.get('/movies', function (req, res) {
    movieModel.find({}, function (err, movies) {
        res.contentType('json');
        res.json({
            success: true,
            data: movies
        });
    });
});


app.listen(14236);
