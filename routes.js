var Todo = require('./models/todo')(Todo);

module.exports = (server) => {

    function errorMessage(testName, error) {
        console.log("There is an error with " + testName + " : " + error);
    }
    function objectNotFound(res, id){
        res.send('object with id ' + id + ' does not exist.');
    }
    //Test 1: Create a Todo
    server.post('/todos', async (req, res, next) => {
        try {
            const listObject = await Todo.create({
                title: req.body.title,
                completed: false
            });
            res.status(201);
            var responseObject = {
                "id": listObject.dataValues.id,
                "title": listObject.dataValues.title,
                "completed": listObject.dataValues.completed
            }
            res.send(responseObject);            
        } catch (err) {
            errorMessage('Test 1 (post/todos)', err);
        }
    });

    //Test 2: List all Todos
    server.get('/todos', async (req, res, next) => {
        try {
            const todoObjects = await Todo.findAll();
            res.send(todoObjects);
        } catch (err) {
            errorMessage('Test 2 (get/todos)', err);
        }
    });

    //Test 3: Archive complete Todos
    server.del('/todos', async (req, res, next) => {
        try {
            const val = await Todo.destroy({ where: { completed: true } });
            res.send(204);
        } catch (err) {
            errorMessage('Test 3 (del/todos)', err);
        }
    });

    //Test 4: Get a Todo
    server.get('/todos/:id', async (req, res, next) => {
        try {
            const todo = await Todo.findById(req.params.id);
            if (todo == null) {
                objectNotFound(res, req.params.id);
            } else {
                res.send(todo);
            }
        } catch (err) {
            errorMessage('Test 4 (get/todos/:id)', err);
        }
    });

    //Test 5: Update a Todo
    server.put('/todos/:id', async (req, res, next) => {
        try {
            const todo = await Todo.findById(req.params.id);
            if (todo == null) {
                objectNotFound(res, req.params.id);
            } else {
                todo.completed = true;
                todo.save().then((listItemObject) => { 
                    var listItem = {
                        "id": listItemObject.id,
                        "title": listItemObject.title,
                        "completed": listItemObject
                    };
                    res.send(listItem);
                });
            }
        } catch (err) {
            errorMessage('Test 5 (put/todos/:id)', err);
        }
    });

    //Test 6: Delete a Todo
    server.del('/todos/:id', async (req, res, next) => {
        try {
            const todoList = await Todo.findById(req.params.id);
            if (todoList != null) {
                const val = Todo.destroy({ where: { id: req.params.id } });
                res.send(204);
            } else {
                objectNotFound(res, req.params.id);
            }
        } catch (err) {
            errorMessage('Test 5 (del/todos/:id)', err);
        }
    });

    return server;
}
