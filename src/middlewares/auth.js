require('dotenv').config();

const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const statusCode = require('../constants/httpStatusCodes');

const auth = async(req, res, next)=>{
    try {
        const token = req.header('authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({email : decoded.email});

        if(!user){
            throw new Error();
        }

        req.id = user._id;
        req.user = user;
        next();
    } catch (error) {
        res.status(statusCode.UNAUTHORIZED).send({error : 'NOT_AUTHENTICATED'});
    }
};

module.exports=auth;
