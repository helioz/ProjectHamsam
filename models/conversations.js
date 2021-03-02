
const Mongo = require('../lib/mongoDB');
const logger = require('../lib/standardLogging')


module.exports = {
    insert: (object) => {
        return new Promise(async (resolve, reject) => {
            Mongo.getDbClient()
                .then(dbConn => {
                    logger.info('insert', 'usersModel', "Creating new user : ", object)
                    dbConn.collection('users').insertOne(object)
                        .then(res => {
                            if (res.result.n === 1 && res.result.ok === 1) {
                                resolve(res.ops[0])
                            } else {
                                logger.error('insert', 'usersModel', "Something went wrong while inserting", res);
                                reject(res.result)
                            }
                        })
                        .catch(err => {
                            if (err.code === 11000) {
                                logger.warn('insert', 'usersModel', "user already added");
                                resolve({
                                    status: 'duplicate',
                                    message: 'No view added',
                                });
                                return;
                            } else {
                                logger.error('insert', 'usersModel', "Could not insert data", err);
                                reject(err)
                            }
                        });
                })
                .catch(err => {
                    logger.error('insert', 'usersModel', "connection error", err);
                    reject("usersModel:insert => ERROR connection error");
                });
        })
    },

}