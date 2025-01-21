module.exports = function mail({
 email, subject, html
}){
    const mailOption = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        html: html 
    }
    return mailOption
}