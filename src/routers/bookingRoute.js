const router = require('express').Router();

const auth = require('../middlewares/auth');
const Booking = require('../models/bookingModel');
const Train = require('../models/trainModel');

router.get('/', (req, res)=>{
    res.send('Testing route for booking tickets')
});

router.post('/subscribe', auth,async(req, res)=>{
    try {
        const {code, station} = req.body;
        if(!code){
            throw new Error('Please provide a train code');
        };
        if(!station){
            throw new Error('Please provide your boarding station')
        }
        const train = await Train.findOne({code});

        if(!train){
            throw new Error('Invalid train code');
        }

        if(!train.route.includes(station)){
            throw new Error('This train will not go through this station');
        }

        if(train.route.indexOf(station) < train.route.indexOf(train.currentStation)){
            throw new Error('Train have already passed this station')
        }

        const booking = new Booking({
            user : req.user._id,
            train : train._id,
            boardingStation : station
        });

        await booking.save();

        res.json({
            status : true,
            message : 'Booking done successfully',
            data : booking
        })

            
    } catch (error) {
        res.send({error : error.message});
    }
})

module.exports = router;
