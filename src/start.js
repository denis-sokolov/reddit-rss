#!/usr/bin/env node
const createServer = require('.').createServer;
const port = process.env.PORT || 5000;
createServer(port);
console.log('Listening on port', port);
