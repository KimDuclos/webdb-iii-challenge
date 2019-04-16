const express = require("express");

const cohorts = require('./routes/cohorts')
const students = require('./routes/students')

const server = express();

// Middleware
server.use(express.json())

// Routes
server.use('/routes/cohorts', cohorts);
server.use('/routes/students', students);

module.exports = server;