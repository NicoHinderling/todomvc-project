var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DB_URL)

var models = [
    'Todo',
]
models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});