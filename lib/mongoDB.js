'use strict';
require('dotenv').config();

const logger = require('./standardLogging');

const MongoClient = require('mongodb').MongoClient;
const Env = require('../config/environment');

const user = encodeURIComponent(Env.MongoUser);
const password = encodeURIComponent(Env.MongoPassword);
const host = Env.MongoHost;
const dbName = encodeURIComponent(Env.MongoDB);

let _mongoConnection = null;
let connection = null;
let url = "mongodb+srv://" + user + ":" + password + "@" + host + '/' + dbName + '?retryWrites=true&w=majority';


const Mongo = {
    getDbClient: () => {
        return new Promise((resolve, reject) => {
            if (!connection) {
                logger.info('getDbClient', 'mongo', 'Creating new mongo connection')
                const options = {}
                options.useUnifiedTopology = true
                options.useNewUrlParser = true
                options.connectTimeoutMS = 30000
                options.socketTimeoutMS = 5000
                console.log(url)
                connection = MongoClient.connect(url, options)
            }
            connection
                .then((client) => {
                    _mongoConnection = client.db(dbName);
                    resolve(_mongoConnection);
                    return;
                })
                .catch((err) => {
                    connection = null;
                    logger.error('getDbClient', 'mongo', 'Connection to mongo failed', err);
                    reject(null);
                    return;
                });
        })
    },
};
module.exports = Mongo;