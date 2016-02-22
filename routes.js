'use strict';

require("babel-polyfill");
var restify = require('restify');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

module.exports = function(server) {
    var server = restify.createServer();
    server.use(restify.bodyParser());

    //Test 1: Create a Todo
    server.post('/todos', function (req, res, next) {
        Todo.build({
            title: req.body.title,
            completed: false
        }).save().then(function (test) {
            res.status(201);
            res.charSet('utf-8');
            res.json(test.dataValues);
        });
    });

    //Test 2: List all Todos
    server.get('/todos', function (req, res, next) {
        Todo.findAll().then(function (rows) {
            res.charSet('utf-8');
            res.json(rows);
        });
        next();
    });

    //Test 3: Archive complete Todos
    server.del('/todos', function (req, res, next) {
        Todo.destroy({ where: { completed: true } }).then(function () {
            res.send(204);
        });
    });

    //Test 4: Get a Todo
    server.get('/todos/:id', function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
            var todo;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return Todo.findById(req.params.id);

                        case 2:
                            todo = _context.sent;

                            res.charSet('utf-8');
                            if (todo == null) {
                                res.send('object with this id does not exist.');
                            } else {
                                res.json(todo);
                            }

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2, _x3) {
            return ref.apply(this, arguments);
        };
    }());

    //Test 5: Update a Todo
    server.put('/todos/:id', function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
            var todo;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return Todo.findById(req.params.id);

                        case 2:
                            todo = _context2.sent;

                            res.charSet('utf-8');
                            if (todo == null) {
                                res.send('object with this id does not exist.');
                            } else {
                                todo.completed = true;
                                todo.save().then(function (values) {
                                    res.send(values);
                                });
                            }

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function (_x4, _x5, _x6) {
            return ref.apply(this, arguments);
        };
    }());

    //Test 6: Delete a Todo
    server.del('/todos/:id', function (req, res, next) {
        Todo.destroy({ where: { id: req.params.id } }).then(function () {
            res.send(204);
        });
    });

    return server;
}
