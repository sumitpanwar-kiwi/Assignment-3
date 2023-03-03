const Subscribe = require('../models/subscribeModel');
const Train = require('../models/trainModel');

const {subscribeEmail} = require('../emails/mails');

const statusCode = require('../constants/httpStatusCodes');


const subscribe = async(req, res)=>{
    try {
        const {code} = req.body;
        if(!code){
            throw new Error('Please provide a train code');
        };

        const train = await Train.findOne({code});

        if(!train){
            throw new Error('Invalid train code');
        }

        if(await Subscribe.findOne({user : req.user._id, train : train._id})){
            throw new Error('User have already subscribed for this train')
        }

        const subscribe = new Subscribe({
            user : req.user._id,
            train : train._id,
        });
        await subscribe.save();

        subscribeEmail(req.user.email, train, subscribe, req.user)

        res.status(statusCode.OK).json({
            status : true,
            message : 'Train Subscribed successfully',
            data : subscribe
        })

    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message});
    }
};

module.exports = subscribe;
