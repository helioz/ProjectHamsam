const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const Env = require('./config/environment');

// const path = require('path');
const url = 'mongodb://127.0.0.1:27017/project-aloha';

// Connect to mongoDB
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

// Extended https://swagger.io/specification/
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Hamsam APIs',
            description: 'A Messaging backend',
            contact: {
                name: 'Soorej Jones',
                email: 'soorejjones@gmail.com'
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        version: '0.0.1'
    },
    apis: ['app.js', './routes/api/v1/*.js'],
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)


const apiV1ConversationsRouter = require('./routes/api/v1/conversations');
const apiV1UsersRouter = require('./routes/api/v1/users');


const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(morgan('dev'));



app.use('/api/v1/conversations', apiV1ConversationsRouter);
app.use('/api/v1/users', apiV1UsersRouter)


app.listen(Env.Port || '3000');