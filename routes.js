import Todo from './models/todo';

export default (server) => {
  server.use(async (req, res, next) => {
    if (req.params.id) {
      req.todo = await Todo.findById(req.params.id);
      if (req.todo === null) {
        res.send(`Unable to find a todo with id: ${req.params.id}`);
        return;
      }
    }
    next();
  });

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
    const todos = await Todo.findAll();
    res.send(todos);
  });

  // Test 3: Archive complete Todos
  server.del('/todos', async (req, res) => {
    Todo.archiveCompleted();
    res.send(204);
  });

  // Test 4: Get a Todo
  server.get('/todos/:id', async (req, res) => {
    res.send(req.todo);
  });

  // Test 5: Update a Todo
  server.put('/todos/:id', async (req, res) => {
    req.todo.completed = true;
    req.todo.save();
    res.send(req.todo);
  });

  // Test 6: Delete a Todo
  server.del('/todos/:id', async (req, res) => {
    req.todo.destroy();
    res.send(204);
  });

  return server;
};
