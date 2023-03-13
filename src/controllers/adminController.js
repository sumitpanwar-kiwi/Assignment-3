const User = require('../models/userModel');

const statusCode = require('../constants/httpStatusCodes');

const getUser = async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);

        if(!user){
            throw new Error('Invalid userId')
        }

        res.status(statusCode.OK).json({
            status : true,
            data : user
        });

    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message});
    }
};

const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find();
        res.status(statusCode.OK).json({
            status : true,
            data : users
        })
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message});
    }
};

const updateUser = async(req, res)=>{
    try {
    const user = await User.findById(req.params.id);
    if(!user){
        throw new Error('Invalid userId')
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'phoneNumber', 'role', 'active'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation)
        throw new Error('Invalid updates')

        updates.forEach((update)=>{
            user[update] = req.body[update];
        })
        await user.save();

        res.status(statusCode.OK).json({
            status : true,
            message : 'User updated successfully',
            data : user
        })
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send({error : error.message});
    }
};

module.exports = {
    getUser,
    getAllUsers,
    updateUser,
}