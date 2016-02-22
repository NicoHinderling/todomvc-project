var Sequelize = require('sequelize');

module.exports=function(sequelize, DataTypes){ 
  return Todo = sequelize.define('todoentries', {
    title: {
        type: Sequelize.STRING,
    },
    completed: { type: Sequelize.BOOLEAN }
},
    {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    }
    );
};