var restify = require('restify');
var Todo = require('./models/todo')(Todo);

module.exports = (server) => {
    var server = restify.createServer();
    server.use(restify.bodyParser());

    //Test 1: Create a Todo
    server.post('/todos', (req, res, next) => {
        Todo.create({
            title: req.body.title,
            completed: false
        }).then((rows) => {
            res.status(201);
            res.charSet('utf-8');
            res.send(rows.dataValues);
        });
    });

    //Test 2: List all Todos
    server.get('/todos', (req, res, next) => {
        Todo.findAll().then((rows) => {
            res.charSet('utf-8');
            res.send(rows);
        });
        next();
    });

    //Test 3: Archive complete Todos
    server.del('/todos', (req, res, next) => {
        Todo.destroy({ where: { completed: true } }).then(() => res.send(204));
    });

    //Test 4: Get a Todo
    server.get('/todos/:id', async (req, res, next) => {
        res.charSet('utf-8');
        let todo = await Todo.findById(req.params.id);
        if (todo == null) {
            res.send('object with this id does not exist.');
        } else {
            res.send(todo);
        }
    });

    //Test 5: Update a Todo
    server.put('/todos/:id', async (req, res, next) => {
        res.charSet('utf-8');
        let todo = await Todo.findById(req.params.id);
        if (todo == null) {
            res.send('object with this id does not exist.');
        } else {
            todo.completed = true;
            todo.save().then((values) => { res.send(values) });
        }
    });

    //Test 6: Delete a Todo
    server.del('/todos/:id', (req, res, next) => {
        Todo.destroy({ where: { id: req.params.id } }).then(() => { res.send(204) });
    });

    return server;
}
