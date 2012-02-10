
var express = require('express'),
	app = module.exports = express.createServer();
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://tcaland:todoL1st@staff.mongohq.com:10009/todolist');

var Todo = mongoose.model('todos', new mongoose.Schema({
	udid: String,
	title: String,
	location: String,
	alarm: Boolean,
	dueDate: Date,
	path: String
}));


var Movie = mongoose.model('movies', new mongoose.Schema({
    title: String,
    year: Number
}));

app.configure(function () {
    //app.set('views', __dirname + '/views');
    //app.set('view engine', 'jade');
    app.use(express.bodyParser());//parse JSON into objects
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});



   
app.get('/', function(req, res) {
     res.send('ToDo List test 2!');
});

app.get('/:udid', function(req, res) {
	console.log(req.params.udid);
	Todo.find({udid:req.params.udid}, function (err, todos) {
		res.contentType('json');
		res.json({
			success: true,
			data: todos
		});
	});
});

app.post('/:udid', function (req, res) {
    console.log(req.body);
    var newTodo = new Todo();
    var newTodoData = req.body;
    newTodoData.udid = req.params.udid;

    // remove the id which the client sends since it is a new Movie
    //delete newMovieData['_id'];
    newTodo.set(newTodoData);
    console.log(newTodo);
    newTodo.save(function (err, todo) {
	if (err) {
		console.log(err);
	}
        res.contentType('json');
        res.json({
            success: 0,
            data: todo
        });
    });
});

app.listen(14236);
