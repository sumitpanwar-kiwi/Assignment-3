const router = require('express').Router();

const adminAuth = require('../middlewares/adminAuth');

const adminController = require('../controllers/adminController');

router.get('/', adminAuth, (req, res)=>{
    res.send('Admin testing route');
});

router.get('/user/:id', adminAuth, adminController.getUser);

router.get('/users', adminAuth, adminController.getAllUsers);

router.put('/userUpdate/:id', adminAuth, adminController.updateUser);

module.exports = router;
