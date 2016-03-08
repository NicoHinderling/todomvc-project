'use strict';

var environment = process.env.NODE_ENV;

// Check that all environment variables are set
if(environment == 'development'){
    console.log("Running in the development environment.");
    require('./env_dev');
} else if(environment == 'production'){
    console.log("Running in the production environment.");
    require('./env_prod');
} else {
    console.log("process.env.NODE_ENV must be either 'development' or 'production'. Exiting now.");
    process.exit();
}

if(!process.env.DATABASE_URL){
    console.log("process.env.DATABASE_URL is not set. Exiting now.");
    process.exit();
}

var restify = require('restify');
var server = restify.createServer();
module.exports = server;

server.use(restify.bodyParser());
require('./routes')(server);

server.listen(process.env.PORT || 8081, () => {
    console.log('%s listening at %s', server.name, server.url);
});
