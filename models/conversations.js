
const Mongo = require('../lib/mongoDB');
const logger = require('../lib/standardLogging')


module.exports = {
    insert: async (object) => {
        try {
            const dbConn = await Mongo.getDbClient();
            logger.info('insert', 'usersModel', "Creating new conversation : ", object)
            try {
                const res = await dbConn.collection('conversations').insertOne(object)
                if (res.result.n === 1 && res.result.ok === 1) {
                    return (res.ops[0])
                } else {
                    logger.error('insert', 'conversationsModel', "Something went wrong while inserting", res);
                    throw (res.result)
                }
            } catch (err) {
                if (err.code === 11000) {
                    logger.warn('insert', 'conversationsModel', "Conversation ID taken");
                    return {
                        status: 'duplicate',
                        message: 'No view added',
                    };
                } else {
                    logger.error('insert', 'conversationsModel', "Could not insert data", err);
                    throw (err)
                }
            }
        } catch (err) {
            logger.error('insert', 'conversationsModel', "connection error", err);
            throw (err);
        }
    },

    getOne: async (convId) => {
        try {
            const dbConn = await Mongo.getDbClient();
            try {
                const resp = await dbConn.collection('conversations').findOne({ "_id": convId });
                return resp;
            } catch (err) {
                logger.error('getOne', 'conversationsModel', 'Error finding ID', err);
                throw (err)
            }
        } catch (err) {
            logger.error('getOne', 'conversationsModel', 'connection error', err);
            throw (err);
        }
    },

    getAll: async () => {

    },
}