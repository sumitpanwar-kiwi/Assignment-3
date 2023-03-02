const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('Testing route of station router');
})

module.exports = router;
