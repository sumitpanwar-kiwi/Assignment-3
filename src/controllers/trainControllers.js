const Train = require('../models/trainModel');
const {stationUpdate} = require('../emails/mails');
const Subscribe = require('../models/subscribeModel');
const User = require('../models/userModel');

const statusCode = require('../constants/httpStatusCodes');

const addTrain = async(req, res)=>{
    try {
        const {code, name, route} = req.body;
    
        if(await Train.findOne({code})){
            throw new Error('Train with this code already added');
        }

        if(!route){
            throw new Error('Please provide the route of the train')
        }

        const currentStation = route[0];

        const train = new Train({
            code,
            name,
            route,
            currentStation,
        });

        await train.save();

        res.status(statusCode.CREATED).json({
            status : true,
            message : 'train added successfully',
            data : train
        })

    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message});
    }
}

const allTrains = async(req, res)=>{
    try {
        const trains = await Train.find();
        res.status(statusCode.OK).json({
            status : true,
            data : trains
        })
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message});
    }
}

const getTrain = async(req, res)=>{
    try {
        const code = req.params.code;
        const train = await Train.findOne({code});

        if(!train){
            throw new Error('Invalid train code');
        }

        res.status(statusCode.OK).json({
            status : true,
            data : train
        })

    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message});
    }
}

const updateStation = async(req, res)=>{
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
        if(station != train.route[0]){
            train.started = true;
        }else{
            train.started = false;
        }
        if(station == train.route[train.route.length -1]){
            train.reached = true
        }else{
            train.reached = false;
        }
        
        await train.save();

        const subscribes = await Subscribe.find({train : train._id, active : true});

        const emailToSent = [];

        for(let i=0; i<subscribes.length ; i++){
            const user = await User.findById(subscribes[i].user)
            emailToSent[i] = user.email;
        }

        if(emailToSent.length >0){
            stationUpdate(emailToSent, train)

            if(station == train.route[train.route.length -1]){
                for(let i=0; i<subscribes.length ; i++){
                    subscribes[i].active = false;
                    await subscribes[i].save();
                }
            }
        }
        
        res.status(statusCode.OK).json({
            status : true,
            message : 'Station updated successfully'
        })

    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message})
    }
}

module.exports = {
    addTrain,
    allTrains,
    getTrain,
    updateStation
}