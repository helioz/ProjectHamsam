const Joi = require('joi');
const StandardError = require('../../../lib/standardError');
const logger = require('../../../lib/standardLogging')


module.exports = {
    post: (req, res) => {
        // Create a new user:

        console.log(req.body);
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
        res.send(req.body)

    },

}

