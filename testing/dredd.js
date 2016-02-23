var Todo = require('../models/todo')(Todo);

Todo.sync({ force: true });