const router = require('express').Router();

const subscribe = require('../controllers/subscribeControllers')

const auth = require('../middlewares/auth');

router.get('/', (req, res)=>{
    res.send('Testing route for booking tickets')
});

router.post('/subscribe', auth , subscribe);

module.exports = router;
