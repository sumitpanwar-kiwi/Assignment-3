const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    code : {
        type : String,
        required : [true, 'Please provide the station code']
    },
    name : {
        type : String,
        lowercase : true,
        required : [true, 'Enter station name'],
    },
    tracks :{
        type : String,
        required : [true, 'Enter the number of tracks in the station']
    },
    platforms :{
        type : String,
        required : [true, 'Enter the number of platforms in the station']
    },
    status : {
        type : Boolean,
        default : true,
    },
});

module.exports = mongoose.model('stations', stationSchema);
