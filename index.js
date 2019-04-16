const express = require('express');
const port = 4000;
const helmet = require('helmet');
const cohorts = require('./routes/cohorts');
const students = require('./routes/students');
const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cohorts', cohorts);
server.use('/api/students', students);

server.listen(port, () => console.log(`Running on port ${port}`));