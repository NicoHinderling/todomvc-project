module.exports = (sequelize, DataTypes) => {
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize(process.env.DB_URL)
    
    return sequelize.define('todoentries', {
        title: {
            type: Sequelize.STRING,
            unique: false
        },
        completed: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });
};