const express = require('express');
const morgan = require('morgan');

// const path = require('path');


const apiV1ConversationsRouter = require('./routes/api/v1/conversations');
const apiV1UsersRouter = require('./routes/api/v1/users');

const securityMiddleware = require('./middlewares/security')


const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(securityMiddleware);


app.use('/api/v1/conversations', apiV1ConversationsRouter);
app.use('/api/v1/users', apiV1UsersRouter)


app.listen('3000' || process.env.PORT);