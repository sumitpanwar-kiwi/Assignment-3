const express = require('express');

const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');

const swaggerJsDocs = YAML.load('./src/swagger/api.yaml')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use('/api', require('./routers/index'))


app.get('/', (req, res)=>{
    res.send({message : 'This route is to test that the server is running correctly or not'});
});



module.exports = app;
