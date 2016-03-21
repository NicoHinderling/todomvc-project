const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Todo = sequelize.define('todos', {
  title: { type: Sequelize.STRING },
  completed: { type: Sequelize.BOOLEAN },
}, {
  classMethods: {
    archiveCompleted: () => {
      Todo.destroy({ where: { completed: true } });
    },
  },
});

export default Todo;
