const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    train : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'trains'
    },
    boardingStation :{
        type : String,
    },
    bookingDate :{
        type : Date,
        default : new Date(),
    }    
});

module.exports = mongoose.model('bookings', bookingSchema);
