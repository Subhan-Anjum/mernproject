const nodemailer = require('nodemailer');

let transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"subhananjum001@gmail.com",
        pass:"gbkehstfnwkxidtj"
    }
})
module.exports={transporter};