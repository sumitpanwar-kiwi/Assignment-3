require('dotenv').config();
const router = require('express').Router();

const auth = require('../middlewares/auth')
const userController = require('../controllers/userControllers');

router.get('/', (req, res)=>{
    res.send('Testing user route');
});

router.post('/add', userController.addUser);

router.post('/login', userController.login);

router.get('/profile', auth, userController.profile);

router.get('/logout', auth, userController.logout);

router.put('/update', auth, userController.updateUser);

router.delete('/delete', auth, userController.deleteUser);

router.get('/status/:code', auth, userController.trainStatus);

module.exports = router;
