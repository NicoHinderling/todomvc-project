const Todo = require('./models/todo');

module.exports = (server) => {
  function todoNullCheck(todo, res, id) {
    let a = true;
    if (todo === null) {
      console.log(id);
      res.send(`Issue with ${id}.`);
      a = false;
    }
    return a;
  }

  // Test 1: Create a Todo
  server.post('/todos', async (req, res) => {
    const todo = await Todo.create({
      title: req.body.title,
      completed: false,
    });
    res.status(201);
    res.send(todo);
  });

  // Test 2: List all Todos
  server.get('/todos', async (req, res) => {
    const todo = await Todo.findAll();
    res.send(todo);
  });

  // Test 3: Archive complete Todos
  server.del('/todos', async (req, res) => {
    await Todo.destroy({ where: { completed: true } });
    res.send(204);
  });

  // Test 4: Get a Todo
  server.get('/todos/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todoNullCheck(todo, res, req.params.id)) {
      res.send(todo);
    }
  });

  // Test 5: Update a Todo
  server.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todoNullCheck(todo, res, req.params.id)) {
      todo.completed = true;
      todo.save();
      res.send(todo);
    }
  });

  // Test 6: Delete a Todo
  server.del('/todos/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todoNullCheck(todo, res, req.params.id)) {
      Todo.destroy({ where: { id: req.params.id } });
      res.send(204);
    }
  });

  return server;
};
