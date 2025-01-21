const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
})

transporter.verify((error, success) => {
    if(error){
        console.log("error occured", error);
    }else{
        console.log("Mail server connected:", success);
    }
})

module.exports = transporter