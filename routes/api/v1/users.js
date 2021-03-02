const express = require('express');
const router = express.Router();

const usersController = require('../../../controllers/api/v1/users')

const securityMiddleware = require('../../../middlewares/security')

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          requred:
 *              - userId
 *              - username
 *              - displayName
 *          properties:
 *              userId:
 *                  type: string
 *              username:
 *                  type: string
 *              displayName:
 *                  type: string
 *          example:
 *              userId: dead123abc
 *              username: scottlang
 *              displayName: Scott Lang
 * 
 */

router.use(securityMiddleware)

router.get('/users/me', usersController.post);
router.put('/users/me', usersController.post);
router.delete('/users/me', usersController.post);

router.get('/users/:userid', usersController.post);

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Manages Users
 */
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      summary: Gets a list of users 
 *      tags: [Users]
 *      responses: 
 *          200:
 *              description: A list of users
 *              content: 
 *                  application/json:
 *                      type: array
 *                      items:
 *                          #ref: '#components/schemas/User'
 *              
 */
router.get('/', usersController.post);
router.post('/', usersController.post);

module.exports = router;