var Todo = require('./models/todo')(Todo);

module.exports = (server) => {
    //Test 1: Create a Todo
    server.post('/todos', async (req, res, next) => {
        try {
            let objects = await Todo.create({
                title: req.body.title,
                completed: false
            });
            res.status(201);
            res.charSet('utf-8');
            res.send(objects.dataValues);            
        } catch (err) {
            console.log("There is an error with post/todos : ${err}");
        }
    });

    //Test 2: List all Todos
    server.get('/todos', async (req, res, next) => {
        try {
            let objects = await Todo.findAll();
            res.charSet('utf-8');
            res.send(objects);
        } catch (err) {
            console.log("There is an error with get/todos : ${err}");
        }
    });

    //Test 3: Archive complete Todos
    server.del('/todos', async (req, res, next) => {
        try {
            let val = await Todo.destroy({ where: { completed: true } });
            res.send(204);
        } catch (err) {
            console.log("There is an error with get/todos : ${err}");
        }
    });

    //Test 4: Get a Todo
    server.get('/todos/:id', async (req, res, next) => {
        try {
            res.charSet('utf-8');
            let todo = await Todo.findById(req.params.id);
            if (todo == null) {
                res.send('object with this id does not exist.');
            } else {
                res.send(todo);
            }
        } catch (err) {
            console.log("There is an error with get/todos/:id : ${err}");
        }
    });

    //Test 5: Update a Todo
    server.put('/todos/:id', async (req, res, next) => {
        try {
            res.charSet('utf-8');
            let todo = await Todo.findById(req.params.id);
            if (todo == null) {
                res.send('object with this id does not exist.');
            } else {
                todo.completed = true;
                todo.save().then((values) => { res.send(values) });
            }
        } catch (err) {
            console.log("There is an error with put/todos/:id : ${err}");
        }
    });

    //Test 6: Delete a Todo
    server.del('/todos/:id', async (req, res, next) => {
        try {
            let val = Todo.destroy({ where: { id: req.params.id } });
            res.send(204);
        } catch (err) {
            console.log("There is an error with del/todos/:id : ${err}");
        }
    });

    return server;
}
