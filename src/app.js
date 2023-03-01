const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get('/', (req, res)=>{
    res.send({message : 'This route is to test that the server is running correctly or not'});
});

module.exports = app;
