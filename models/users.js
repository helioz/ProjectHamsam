
const Mongo = require('../lib/mongoDB');
const ObjectID = require('mongodb').ObjectID
const logger = require('../lib/standardLogging')


const usersModel = {
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
    getOne: async (userId) => {
        let dbConn;
        let resp;
        let _id
        try {
            _id = new ObjectID(userId)
        } catch (error) {
            logger.error('getOne', 'usersModel', "User Id not valid", '');
            return null;
        }
        try {
            dbConn = await Mongo.getDbClient();
        } catch (error) {
            logger.error('getOne', 'usersModel', 'connection error', error);
            throw "usersModel:insert => ERROR connection error";
        }
        try {
            resp = await dbConn.collection('users').findOne({ _id }, {})
        } catch (error) {
            logger.error('getOne', 'usersModel', "Could not find user", error);
            throw error
        }
        return resp
    }

}
module.exports = usersModel;