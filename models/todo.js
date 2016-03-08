module.exports = (sequelize, DataTypes) => {
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize(process.env.DATABASE_URL)
    
    return sequelize.define('Todo', {
        title: {
            type: Sequelize.STRING,
            unique: false
        },
        completed: {
            type: Sequelize.BOOLEAN
        }
    });
};