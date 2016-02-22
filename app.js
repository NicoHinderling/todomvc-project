'use strict';

var restify = require('restify')
  , Sequelize = require('sequelize');
  // ,

var sequelize = new Sequelize('postgres://ugvhonfmauvoqk:DPydqMlzSFIQTgB_oT4t5qKG6B@ec2-54-227-245-197.compute-1.amazonaws.com:5432/de63t2vi3da67c', {
})

var todoentries = sequelize.define('todoentries', {
    title: {
        type: Sequelize.STRING,
        field: 'title'
    },
    completed: { type: Sequelize.BOOLEAN }
},
    {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    }
    );

function CreateTodo(req, res, next) {
    todoentries.sync({ force: true }).then(function () {
        todoentries.build({
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
    next();
}

function ListTodos(req, res, next) {
    todoentries.findAll()
        .then(function (rows) {
            res.charSet('utf-8');
            res.json(rows);
        });
    next();
}

function ArchiveTodos(req, res, next) {
    todoentries.destroy({ where: { completed: true }})
        .then(function () {
            res.send(204);
        });
    next();
}

function GetTodo(req, res, next) {
    todoentries.findAll({
        where: {
            id: req.params.id,
        }
    }).then(function (rows) {
        res.charSet('utf-8');
        res.json(rows[0]);
    });
    next();
}

function UpdateTodo(req, res, next) {       //STILL NEEDS TO UPDATE
    todoentries.update({completed: true}, {where: {id: req.params.id}})
        .then(function () {
            todoentries.findAll({
                where: {
                    id: req.params.id,
                }
            })
                .then(function (values) {
                    res.charSet('utf-8');
                    res.send(values[0]);
                });
        });
    next();
}

function DeleteTodo(req, res, next) {       //STILL NEEDS TO DELETE
    todoentries.destroy({ where: { id: req.params.id }})
        .then(function () {
            res.send(204);
        });
    next();
}

var server = restify.createServer();
server.use(restify.bodyParser());

server.post('/todos', CreateTodo);      //Test 1: Create a Todo
server.get('/todos', ListTodos);        //Test 2: List all Todos
server.del('/todos', ArchiveTodos);     //Test 3: Archive complete Todos
server.get('/todos/:id', GetTodo);      //Test 4: Get a Todo
server.put('/todos/:id', UpdateTodo);   //Test 5: Update a Todo
server.del('/todos/:id', DeleteTodo);   //Test 6: Delete a Todo

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
