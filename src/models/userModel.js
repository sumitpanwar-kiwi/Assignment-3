const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        lowercase : true,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Please type a valid format email')
        }
    },
    password : {
        type : String,
        required : true,
    },
    phoneNumber : {
        type : String,
        required : true,
    },
});

module.exports = mongoose.model('users', userSchema);
