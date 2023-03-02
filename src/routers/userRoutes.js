require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../middlewares/auth')

const User = require('../models/userModel');

router.get('/', (req, res)=>{
    res.send('Testing user route');
});

router.post('/add', async(req, res)=>{
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

        res.json({
            status : true,
            message : 'User added successfully',
            data : user
        });

    } catch (error) {
        res.send({error : error.message});
    }
})

router.post('/login', async(req, res)=>{
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

        res.json({
            status : true,
            message : 'Login successfull',
            token
        });
    } catch (error) {
        res.send({error : error.message});
    }
})

router.get('/profile', auth, (req, res)=>{
    res.json({
        status : true,
        data : req.user
    })
})

router.get('/logout', auth, (req, res)=>{
    res.json({
        status : true,
        message : 'Logged out successfully',
        token : ''
    })
});

router.put('/update', auth, async(req, res)=>{
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

        res.json({
            status : true,
            message : 'User updated successfully',
            data : req.user
        })
    } catch (error) {
        res.send({error: error.message});
    }
})

router.delete('/delete', auth, async(req, res)=>{
    await User.deleteOne({email : req.user.email})
    res.json({
        status : true,
        message : 'Profile deleted successfully',
        token : ''
    })
})

module.exports = router;
