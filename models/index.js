var Sequelize = require('sequelize');

var sequelize = new Sequelize('mvctodo', 'postgres', 'nicopostgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

var models = [
    'Todo',
]
models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});