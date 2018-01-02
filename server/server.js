var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose'); //establish db connection
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//middleware return value = json
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //console.log(req.body);
    var todo = new Todo({
        text : req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        //use object to easily add features
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = {
    app
}