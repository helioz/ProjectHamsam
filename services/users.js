const StandardError = require('../lib/standardError');
const logger = require('../lib/standardLogging');

const usersModel = require('../models/users');

const createUser = async (username, displayName, email, userID) => {
    let userAlreadyExists = await checkIfUserExists(email);
    if (userAlreadyExists) {
        throw StandardError(500, 'DUPLICATE_EMAIL', 'Email already exists', { allowed: false })
    } else {
        try {
            const resp = await usersModel.insert({
                userID,
                username,
                displayName,
                email
            });
            return resp;
        } catch (error) {
            logger.error('post', 'usersController', 'Unable to inset user', error);
            throw standardError(500, 'USER_CREATE_FAILED', 'Unable to create user', { allowed: true });
        }
    }
}

const checkIfUserExists = async (email) => {
    return false;
}

module.exports = {
    createUser,
    checkIfUserExists,
}