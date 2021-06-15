const session = require('express-session');
const MongoStore = require('connect-mongo');
const Env = require('./environment');

const sessionStore = MongoStore.create({  // Have a wrapper around db calls, always
    mongoUrl: Env.MONGO_URL,
    collectionName: 'sessions'
});

module.exports = session({
    secret: 'pssssttt',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
});