'use strict';

require('dotenv').config();

var Todo = require('./models').Todo;
var server = require('./routes')(server);

server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
