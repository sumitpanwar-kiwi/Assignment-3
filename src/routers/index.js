const router = require('express').Router();

router.use('/user', require('./userRoutes'));
router.use('/train', require('./trainRoutes'));
router.use('/subscribed', require('./subscribeRoute'));

module.exports = router;
