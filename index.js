const express = require('express');
const morgan = require('morgan');
const Env = require('./config/environment');
const session = require('./config/session.js');

// Db setup
const connection = require('./config/database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// Session management
app.use(session);

app.get('/', (req, res, next) => {
    res.send('<h1> Hello World </h1>');
});

app.listen(Env.Port || '3000');