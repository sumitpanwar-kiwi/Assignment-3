const router = require('express').Router();

const Train = require('../models/trainModel');


router.get('/', (req, res)=>{
    res.send('Testing route for train Router');
});

router.post('/add', async(req, res)=>{
    try {
        const {code, name, route, routeTiming} = req.body;
    
        if(await Train.findOne({code})){
            throw new Error('Train with this code already added');
        }

        if(!route){
            throw new Error('Please provide the route of the train')
        }

        if(!routeTiming){
            throw new Error('Please provide the route timing')
        }

        if(route.length != routeTiming.length){
            throw new Error('Please provide route and route Timing correctly')
        }

        const currentStation = route[0];

        const train = new Train({
            code,
            name,
            route,
            routeTiming,
            currentStation,
        });

        await train.save();

        res.json({
            status : true,
            message : 'train added successfully',
            data : train
        })

    } catch (error) {
        res.send({error : error.message});
    }
});

router.get('/all', async(req, res)=>{
    try {
        const trains = await Train.find();
        res.json({
            status : true,
            data : trains
        })
    } catch (error) {
        res.send({error : error.message});
    }
});

router.get('/info/:code', async(req, res)=>{
    try {
        const code = req.params.code;
        const train = await Train.findOne({code});

        if(!train){
            throw new Error('Invalid train code');
        }

        res.json({
            status : true,
            data : train
        })

    } catch (error) {
        res.send({error : error.message});
    }
});

router.put('/update/:code', async(req, res)=>{
    try {
        const code = req.params.code;
        const train = await Train.findOne({code});

        if(!train){
            throw new Error('Invalid train code');
        }

        const station = req.body.station;
        if(!station){
            throw new Error('Please provide a station')
        }

        isValid = train.route.includes(station);
        
        if(!isValid){
            throw new Error('Provided station is not in the train\'s route')
        }

        train.currentStation = station;
        await train.save();

        res.json({
            status : true,
            message : 'Station updated successfully'
        })

    } catch (error) {
        res.send({error : error.message})
    }
});

module.exports = router;
