'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

const server = require('./routes')(server);

server.listen(process.env.PORT || 8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});
