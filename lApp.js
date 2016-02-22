'use strict';

require("babel-polyfill");

var restify = require('restify');
var Todo = require('./models').Todo;
var server = restify.createServer();

server.use(restify.bodyParser());

function FindByID (id) {
    return Todo.findOne({
        where: {
            id: id,
        }
    })
}

//Test 1: Create a Todo
server.post('/todos', function (req, res, next) {
    Todo.build({
        title: req.body.title,
        completed: false
    })
        .save()
        .then(function (test) {
            res.status(201);
            res.charSet('utf-8');
            res.json(test.dataValues);
        });
});

//Test 2: List all Todos
server.get('/todos', function (req, res, next) {
    Todo.findAll()
        .then(function (rows) {
            res.charSet('utf-8');
            res.json(rows);
        });
    next();
});

//Test 3: Archive complete Todos
server.del('/todos', function (req, res, next) {
    Todo.destroy({ where: { completed: true }})
        .then(function () {
            res.send(204);
        });
});

//Test 4: Get a Todo
server.get('/todos/:id', function (req, res, next) {
    FindByID(req.params.id)
        .then(function (rows) {
            res.charSet('utf-8');
            res.json(rows);
        });
});

//Test 5: Update a Todo
server.put('/todos/:id', async function (req, res, next) {
    let todo = await Todo.findById(1);
    todo.completed = true;
    todo.save()
        .then(function () {
            FindByID(req.params.id)
                .then(function (values) {
                    res.charSet('utf-8');
                    res.send(values);
                });
        });
});

//Test 6: Delete a Todo
server.del('/todos/:id', function (req, res, next) {
    Todo.destroy({ where: { id: req.params.id }})
        .then(function () {
            res.send(204);
        });
});

server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
