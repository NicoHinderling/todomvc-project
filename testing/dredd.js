var environment = process.env.NODE_ENV;

// Check that all environment variables are set
if(environment == 'development'){
    console.log("Running in the development environment.");
    require('../env_dev');
} else if(environment == 'production'){
    console.log("Running in the production environment.");
    require('../env_prod');
} else {
    console.log("process.env.NODE_ENV must be either 'development' or 'production'. Exiting now.");
    process.exit();
}

var Todo = require('../models/todo')(Todo);

Todo.sync({ force: true });