const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        lowercase : true,
        required : [true, 'Please provide name of user'],
    },
    email : {
        type : String,
        required : [true, 'Please provide email of the user'],
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
    role : {
        type : String,
        default : 'user',
        enum :['admin', 'sub-admin', 'user']
    },
    active : {
        type : Boolean,
        default : true,
    }
});

userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();

})

module.exports = mongoose.model('users', userSchema);
