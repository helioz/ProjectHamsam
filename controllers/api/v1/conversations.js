const Joi = require('joi');
const standardError = require('../../../lib/standardError');
const StandardError = require('../../../lib/standardError');
const logger = require('../../../lib/standardLogging')
const mongo = require('mongodb')

const conversationsModel = require('../../../models/conversations')

const _conversation_types = [
    'dm',
    'group'
]

module.exports = {
    get: async (req, res) => { },

    getOne: async (req, res) => {
        let convId;
        try {
            convId = new mongo.ObjectID(req.params.convId);
        }
        catch (error) {
            logger.error('getOne', 'conversationsController', 'Bad conversation id', error);
            res.status(400).send(standardError(400, 'BAD_CONVERSATION_ID', 'Conversation ID is badly formatted', { allowed: true, conditional: true }));
            return;
        }
        try {
            const resp = await conversationsModel.getOne(convId);
            console.log(resp)
            res.status(200).send(resp);
            return;
        } catch (error) {
            logger.error('getOne', 'conversationsController', 'Unable to fetch conversation', error);
            res.status(500).send(standardError(500, 'CONVERSATION_FETCH_FAILED', 'Unable to fetch conversation', { allowed: true }));
            return;
        }
    },

    insert: async (req, res) => {
        const schema = Joi.object().keys({
            title: Joi.string().trim().min(1).required(),
            members: Joi.array().required().items(Joi.string().trim()),
            // admins: Joi.array().required().items(Joi.string().trim()),
            description: Joi.string().trim(),
            type: Joi.string().trim().required().lowercase()
        })
        try {
            Joi.assert(req.body, schema)
            if (req.body.members.indexOf(req.userid) === -1) {
                req.body.members.push(req.userid)
            }
        } catch (err) {
            logger.error('insert', 'conversationsController', 'Badly formatted data', err)
            res.status(400).send(StandardError(400,
                'UNEXPECTED_FORMAT', 'Expected title, and type. description optional', { allowed: true }));
            return;
        }
        let resp;
        try {
            resp = await conversationsModel.insert({
                title: req.body.title,
                description: req.body.description || '',
                type: req.body.type
            })
        } catch (error) {
            logger.error('post', 'usersController', 'Unable to create conversation', error);
            res.status(500).send(standardError(500, 'CONVERSATION_CREATION_FAILED', 'Unable to create conversation', { allowed: true }));
            return;
        }
        try {

        } catch (error) {
            logger.error('post', 'usersController', 'Unable to add admin', error);
            // Delete conversation here
            res.status(500).send(standardError(500, 'CONVERSATION_CREATION_FAILED', 'Unable to create conversation', { allowed: true }));
        }
        const addMembersResults = [];
        for (let i = 0; i < req.body.members.length; i++) {
            addMembersResults.push(conversationMembers.insert({ userId: req.body.members[i], convId: resp._id }))
        }
        try {
            const members = await Promise.all(addMembersResults);
        } catch (err) {
            logger.error('post', 'usersController', 'Unable to add all members', error);
            res.status(500).send(standardError(500, 'CONVERSATION_MEMBERS_FAILED', 'Unable to create conversation', { allowed: false }));
        }
        // Create a db Entry {convId: "", userId: ""} for conversation members and conversation admins
        resp.members = req.body.members
        resp.admins = [req.userid]
        res.status(200).send(resp);
        return;

    },
}

