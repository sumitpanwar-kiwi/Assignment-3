const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    train : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'trains'
    },
    subscribeDate :{
        type : Date,
        default : new Date(),
    },
    active:{
        type : Boolean,
        default : true,
    }    
});

module.exports = mongoose.model('subscribe', subscribeSchema);
