const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = 3000;

app.use(express.static(__dirname + '/dist/frontend'));

app.get('/*', (req, res) => res.sendFile(__dirname + '/dist/frontend/index.html'));

const server = http.createServer(app);

server.listen(port, () => console.log('Running...'));