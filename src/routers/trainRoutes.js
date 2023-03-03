const router = require('express').Router();

const trainController = require('../controllers/trainControllers');

const adminAuth = require('../middlewares/adminAuth');


router.get('/', (req, res)=>{
    res.send('Testing route for train Router');
});

router.post('/add', adminAuth, trainController.addTrain);

router.get('/all', adminAuth, trainController.allTrains);

router.get('/info/:code', trainController.getTrain);

router.put('/update/:code', adminAuth, trainController.updateStation);

module.exports = router;
