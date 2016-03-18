const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize.define('todoentries', {
  title: { type: Sequelize.STRING },
  completed: { type: Sequelize.BOOLEAN },
});
