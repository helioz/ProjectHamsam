'use strict';
const logger = require('./standardLogging');

const MongoClient = require('mongodb').MongoClient;

const user = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PWD);
const host = process.env.MONGO_HOST;
const dbName = encodeURIComponent(process.env.MONGO_DB);

let _mongoConnection = null;
let connection = null;
let url = "mongodb://" + user + ":" + password + "@" + host;


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