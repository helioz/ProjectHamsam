const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const Env = require('./config/environment');
const MongoStore = require('connect-mongo');

// Db setup
// TODO: export connection object to be used?
require('./database');

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
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(morgan('dev'));

// Session management
const sessionStore = MongoStore.create({
    mongoUrl: Env.MONGO_URL,
    collectionName: 'sessions'
});

app.use(session({
    secret: 'pssssttt',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //1 day
    }
}));

app.get('/', (req, res, next) => {
    res.send('<h1> Hello World </h1>');
});

app.listen(Env.Port || '3000');