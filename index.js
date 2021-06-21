const express = require('express');
const morgan = require('morgan');

const Env = require('./config/environment');
const Mongo = require('./lib/mongoDB');
const Logger = require('./lib/standardLogging')
const StandardError = require('./lib/standardError');

const UsersRoutesV1 = require('./routes/api/v1/users');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res, next) => {
    res.send('<h1> Hello World </h1>');
});
app.get('/healthcheck', async (req, res, next) => {
    try {
        const dbConn = await Mongo.getDbClient();
        const resp = await dbConn.collection('userInfo').findOne({ "name": 'aloha' });
        Logger.info('healthcheck', 'index', resp)
        res.status(200).send({ status: 'healthy' });
        return;
    } catch (error) {
        Logger.error('healthcheck', 'index', 'DB connection unhealthy', error);
        res.status(500).send(StandardError(500, 'DB_CONN_UNHEALTHY', 'DB connection unhealthy', { allowed: true }));
        return;
    }
})

app.listen(Env.Port || '3000');