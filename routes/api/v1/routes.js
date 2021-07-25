const express = require('express');
const router = express.Router();

const usersController = require('../../../controllers/api/v1/users');
// const usersController = require('../../../controllers/api/v1/users')
// const usersController = require('../../../controllers/api/v1/users')
// const usersController = require('../../../controllers/api/v1/users')


// const securityMiddleware = require('../../../middlewares/security')

// router.use(securityMiddleware);

// Users
router.get('/users/:userId', usersController.getUserInfo);
router.post('/users/', usersController.createNewUser);
// router.put('/users/:userId', usersController.updateUserInfo);
// router.delete('/users/:userId', usersController.deleteUserAccount);

// // Shouts
// router.post('/users/:userId/shouts', shoutController.createShout);
// router.get('/users/:userId/shouts/', shoutController.listMyShouts);
// router.get('/users/:userId/shouts/:shoutId', shoutController.getMyShout);
// router.delete('/users/:userId/shouts/:shoutId', shoutController.deleteShout);


// // Flirts
// router.post('/users/:userId/shouts/:shoutId/flirts', shoutController.addFlirt);
// router.get('/users/:userId/shouts/:shoutId/flirts/', shoutController.listFlirts);
// router.get('/users/:userId/shouts/:shoutId/flirts/:flirtId', shoutController.getFlirt);

// // Conversations
// router.post('/users/:userId/conversations', conversationsController.createConversation);
// router.get('/users/:userId/conversations', conversationsController.listConversations);
// router.get('/users/:userId/conversations/:conversationId',conversationsController.getConversation );
// router.delete('/users/:userId/conversations/:conversationId', conversationsController.unmatch);

// // Earshot
// router.get('/users/:userId/earshots', earshotsController.listEarshots);






module.exports = router;