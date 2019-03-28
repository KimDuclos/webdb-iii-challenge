const express = require("express");

const cohortsRouter = require('./routes/cohorts')
const studentsRouter = require('./routes/students')

const server = express();

// Middleware
server.use(express.json())

// Routes
server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;