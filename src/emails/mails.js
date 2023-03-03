require('dotenv').config();

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user : process.env.HOST_EMAIL,
        pass : process.env.HOST_PASSWORD,
    }
});

const subscribeEmail = function(email, train, subscribe, user){
    let mailOptions = {
        from : process.env.HOST_EMAIL,
        to : email,
        subject : 'Subscribe successfully',
        html : `<h2>Your train subscription was successfull. Your details are given below : </h2>
        User Name : ${user.name}<br>
        Train Code : ${train.code}<br>
        Train Name : ${train.name}<br>
        Starting Station : ${train.route[0]}<br>
        Destination Station : ${train.route[train.route.length -1]}<br>
        Current Station : ${train.currentStation}<br>
        Subscribe Date and time : ${subscribe.subscribeDate.toString()}
        `,
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error)
        }else{
            console.log('Subscribe email sent');
        }
    })
}
const stationUpdate = function(emailToSent, train){
    let mailOptions = {
        from : process.env.HOST_EMAIL,
        to : emailToSent,
        subject : 'Station updated',
        html : `<h2>Train station have been updated. The details are given below : </h2>

        Train Code : ${train.code}<br>
        Train Name : ${train.name}<br>
        Current Station : ${train.currentStation}<br>
        `,
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error)
        }else{
            console.log('Station update email sent');
        }
    })
}

module.exports = {
    subscribeEmail,
    stationUpdate,
}