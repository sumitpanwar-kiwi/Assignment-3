const router = require('express').Router();
const adminAuth = require('../middlewares/adminAuth');

router.use('/user', require('./userRoutes'));
router.use('/train', adminAuth, require('./trainRoutes'));
router.use('/booking', require('./bookingRoute'));

module.exports = router;
