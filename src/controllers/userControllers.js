const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const Train = require('../models/trainModel');
const Subscribe = require('../models/subscribeModel');

const statusCode = require('../constants/httpStatusCodes');

const addUser = async(req, res)=>{
    try {
        const {name, email, password, phoneNumber} = req.body;

        if(await User.findOne({email})){
            throw new Error('Email is already registered')
        }

        if(phoneNumber.length != 10){
            throw new Error('Phone Number should be of length 10');
        }

        const user = new User({
            name,
            email,
            password,
            phoneNumber
        });

        await user.save();

        res.status(statusCode.CREATED).json({
            status : true,
            message : 'User added successfully',
            data : user
        });

    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message});
    }
}

const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
    
        if(!email){
            throw new Error('Please provide an email');
        }

        if(!password){
            throw new Error('Please provide a password');
        }

        const user = await User.findOne({email});

        if(!user){
            throw new Error('User with given email is not registered')
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error('Wrong Password')
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET)

        res.status(statusCode.OK).json({
            status : true,
            message : 'Login successfull',
            token
        });
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message});
    }
}

const profile = (req, res)=>{
    res.status(statusCode.OK).json({
        status : true,
        data : req.user
    })
}

const logout = (req, res)=>{
    res.status(statusCode.OK).json({
        status : true,
        message : 'Logged out successfully',
        token : ''
    })
}

const updateUser = async(req, res)=>{
    try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'phoneNumber'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation)
        throw new Error('Invalid updates')

        updates.forEach((update)=>{
            req.user[update] = req.body[update];
        })
        await req.user.save();

        res.status(statusCode.OK).json({
            status : true,
            message : 'User updated successfully',
            data : req.user
        })
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error: error.message});
    }
}

const deleteUser = async(req, res)=>{
    await User.deleteOne({email : req.user.email})
    res.status(statusCode.OK).json({
        status : true,
        message : 'Profile deleted successfully',
        token : ''
    })
};

const trainStatus = async(req, res)=>{
    try {
        const code = req.params.code;
        const train = await Train.findOne({code});

        if(!train){
            throw new Error('Invalid train code');
        }
        
        const subscribe = await Subscribe.findOne({user : req.user._id, train : train._id});

        if(!subscribe){
            throw new Error('User have not subscribed for this train');
        }
        res.status(statusCode.OK).json({
            status : true,
            data : train
        })

    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message});
    }
}

module.exports = {
    addUser,
    login,
    profile,
    logout,
    updateUser,
    deleteUser,
    trainStatus,
}
