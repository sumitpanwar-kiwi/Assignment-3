const router = require('express').Router();

router.use('/user', require('./userRoutes'));
router.use('/station', require('./stationRoutes'));

module.exports = router;
