require('dotenv').config();

require('./src/configs/db')

const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`)
})
;