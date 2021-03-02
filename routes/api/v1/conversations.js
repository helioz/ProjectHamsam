const express = require('express');
const router = express.Router();
const conversationsController = require('../../../controllers/api/v1/conversations')

const securityMiddleware = require('../../../middlewares/security')

router.use(securityMiddleware);

router.post('/', conversationsController.insert);


router.get('/:convId', conversationsController.getOne);
router.delete('/:convId', conversationsController.get);
router.put('/:convId', conversationsController.get);

router.get('/:convId/messages', conversationsController.get);
router.post('/:convId/messages', conversationsController.get);
router.get('/:convId/messages/:messageId', conversationsController.get);
router.delete('/:convId/messages/:messageId', conversationsController.get);
router.put('/:convId/messages/:messageId', conversationsController.get);





module.exports = router;