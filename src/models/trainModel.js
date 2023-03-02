const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    code : {
        type : String,
        required : [true, 'Please provide the pnr number of the train']
    },
    name :{
        type : String,
        required : [true, 'Please provide the name of the train']
    },
    currentStation:{
        type : String,
    },
    route :{
        type : Array,
        required : true
    },
    routeTiming :{
        type : Array,
        required : true
    },
    started : {
        type :Boolean,
        default : false
    },
    reached :{
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('trains', trainSchema)
