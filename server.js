
var app = require('express').createServer();
   
app.get('/', function(req, res) {
     res.send('ToDo List test!');
});

app.get('/movies', function (req, res) {
      res.contentType('json');
      res.json({
          success: true,
          data: [{
              title: "The Matrix",
              year: 1999
          }, {
              title: "Star Wars: Return of the Jedi",
              year: 1983
          }]
      });
  });


app.listen(14236);
