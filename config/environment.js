
require('dotenv').config();
module.exports = {
    Port: process.env.PORT,
    MongoHost: process.env.MONGO_HOST,
    MongoUser: process.env.MONGO_USER,
    MongoPassword:process.env.MONGO_PWD,
    MongoDB: process.env.MONGO_DB
};