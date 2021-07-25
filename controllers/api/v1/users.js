const Joi = require('joi');
const StandardError = require('../../../lib/standardError');
const logger = require('../../../lib/standardLogging');
const usersModel = require('../../../models/users')

const Genders = ['m', 'f', 'o', 'mtf', 'ftm']
const InterestedIn = ['women only', 'men only', 'women and men', 'asexual', 'pan']

module.exports = {

    createNewUser: async (req, res) => {
        const schema = Joi.object().keys({
            username: Joi.string().trim().min(1).lowercase().required(),
            dateOfBirth: Joi.date().min('1-1-1900').max('now').required(),
            email: Joi.string().trim().email().required(),
            phone: Joi.string().trim(),
            gender: Joi.string().lowercase().valid(...Genders).required(),
            interestedIn: Joi.string().lowercase().valid(...InterestedIn).required(),
            location: Joi.string(),
            maxMatchDistance: Joi.number().required()
        })
        try {
            Joi.assert(req.body, schema)
        } catch (err) {
            logger.error('post', 'usersController', 'Badly formatted data', err)
            res.status(400).send(StandardError(400,
                'UNEXPECTED_FORMAT', 'Check if all required fields are added', { allowed: true }, ''));
            return;
        }
        const user = {
            username: req.body.username,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            interestedIn: req.body.interestedIn,
            location: req.body.location,
            maxMatchDistance: req.body.maxMatchDistance
        }
        try {
            const resp = await usersModel.insert(user);
            res.status(200).send(resp);
            return;
        } catch (error) {
            logger.error('post', 'usersController', 'Unable to inset user', error);
            res.status(500).send(StandardError(500, 'USER_CREATION_FAILED', 'Unable to create user', { allowed: true }));
            return;
        }
    },

    getUserInfo: async (req, res) => {
        let resp
        try {
            resp = await usersModel.getOne(req.params.userId);
        } catch (error) {
            logger.error('getUserInfo', 'usersController', 'Unable to get user', error);
            res.status(500).send(StandardError(500, 'USER_GET_FAILED', 'Unable to get user', { allowed: true }));
            return;
        }
        if (resp === null) {
            res.status(404).send(StandardError(404, 'USER_NOT_FOUND', 'User not found', { allowed: false }));
            return
        }
        res.status(200).send(resp);
        return;
    }
}

