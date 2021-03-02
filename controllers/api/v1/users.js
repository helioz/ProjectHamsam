const Joi = require('joi');
const standardError = require('../../../lib/standardError');
const StandardError = require('../../../lib/standardError');
const logger = require('../../../lib/standardLogging')
const usersModel = require('../../../models/users')


module.exports = {
    post: async (req, res) => {
        const schema = Joi.object().keys({
            username: Joi.string().trim().min(1).required(),
            displayName: Joi.string().trim().min(1).required(),
            // email: Joi.string().trim().email().required()
        })
        try {
            Joi.assert(req.body, schema)
        } catch (err) {
            logger.error('post', 'usersController', 'Badly formatted data', err)
            res.status(400).send(StandardError(400,
                'UNEXPECTED_FORMAT', 'Expected userName and displayName', { allowed: true }, ''));
            return;
        }
        try {
            const resp = await usersModel.insert({
                username: req.body.username,
                displayName: req.body.displayName
            });
            console.log(resp);
            res.status(200).send(resp);
            return;
        } catch (error) {
            logger.error('post', 'usersController', 'Unable to inset user', error);
            res.status(500).send(standardError(500, 'USER_CREATION_FAILED', 'Unable to create user', { allowed: true }));
            return;
        }
    },

}

