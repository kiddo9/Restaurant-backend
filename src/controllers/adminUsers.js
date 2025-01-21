const { transporter } = require('../middleware/mailer')
const Staffs = require('./../../models/staffs')
const Password = require('./../../models/password')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const mailingFunction = require('../utils/mailingFunction')

exports.staffregistration = [async(req, res) => {
    const {name, email, mobile, type} = req.body

    try {
        const existingEmail = await Staffs.findOne({where: {email: email}})

        if(existingEmail){
            res.json({message: 'Email already exist'})
        }else{
            //await Staffs.create({name, email, mobile, type})

            const mailOption = mailingFunction(email, 'set password', `
                     <div>
                        <p>Admin  created your profile please set your password</P>

                          <a href='https://restaurant-chi-two.vercel.app/api/v3/setpassword/${email}'>Set your password</a>
                    </div>
                `)

                // const mailOption = {
                //     from: "",
                //     to: email,
                //     subject: "Password setting",
                //     html: `
                //         <div>
                //             <p>Admin  created your profile please set your password</P>

                //             <a href='https://restaurant-chi-two.vercel.app/api/v3/setpassword/${email}'>Set your password</a>
                //         </div>
                //     `
                // }

               const mail =  transporter.send(mailOption)

               if(mail){
                    res.json({success: true, message: `${name}'s profile has been create`})
               }else{
                    res.json({mesage: "error occoured"})
               }
        }

    } catch (error) {
        console.log(error);
        res.json({message: 'internal server error'})
    }
}]

exports.Staffs = async(req, res) => {
    const staffs = await Staffs.findAll()
    
    res.json(staffs)
}


exports.setPassword = async(req, res) => {
    const {email} = req.params
    const {pwd} = req.body

    try {
        const getId = await Staffs.findOne({where: {email}})

        if(getId.password != null || getId.password != ""){
            res.json({message: "unknown route. route expired"})
        }

        if(getId){

            const hashpassword = await bcrypt.hash(pwd, 10)

            await Staffs.update({password: hashpassword}, {where: {email: email}})

            res.json({success: true, message: 'password has been set successfully'})
        }else{
            res.json({message: "user not found"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({message: 'something went wrong'})
    }
}

exports.loginAdmin = async(req, res) => {
    const {email, password} = req.body
    const secretKey = process.env.JWTSECRETKEY
    

    try {
        const accountType = await Staffs.findOne({where: {email}})

        if(accountType){
           const type = accountType.type;

           type != "admin" &&
           res.json({message: "this form is for admins only"});

           const comfirmPassword = await bcrypt.compare(password, accountType.password)

           if(comfirmPassword){
            const token = jwt.sign({id: accountType.id,  email: accountType.email, password: accountType.password}, secretKey, {expiresIn: "1h"} )
            res.json({success: true, message: 'Authentication successfull', Token: token})

           }else{

            res.json({message: 'Invalid password'})
           }
            
        }else{
            console.log("email not found");
            res.json({message: 'invalid or wrong email'})
        }
    } catch (error) {
        console.log(error);
        res.json({message: 'something went wrong'})
    }
    
}


//staff login controller
exports.loginStaff = async(req, res) => {
    const {email, password} = req.body
    const secretKey = process.env.JWTSECRETKEY
    

    try {
        const accountType = await Staffs.findOne({where: {email}})

        if(accountType){
           const type = accountType.type;

           type != "staff" &&
           res.json({message: "this form is for staffs only"});

           const comfirmPassword = await bcrypt.compare(password, accountType.password)

           if(comfirmPassword){
            const token = jwt.sign({id: accountType.id,  email: accountType.email, password: accountType.password}, secretKey, {expiresIn: "1h"} )
            res.json({success: true, message: 'Authentication successfull', Token: token})

           }else{

            res.json({message: 'Invalid password'})
           }
            
        }else{
            console.log("email not found");
            res.json({message: 'invalid or wrong email'})
        }
    } catch (error) {
        console.log(error);
        res.json({message: 'something went wrong'})
    }
    
}


exports.verifyToken = async(req, res, next) => {

    try {
        const token = req.headers["authurization"];
        
        if(!token){
            res.json({success: false})
        }

        const decoded = jwt.verify(token, process.env.JWTSECRETKEY)
        req.user = decoded

        if(decoded){
            res.json({success:true})
        }
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
          }
          return res.status(403).json({ message: "Invalid token" });
    }
    
}

exports.emailVerification = async(req, res) => {
    const {email} = req.body

    const verify = await Staffs.findOne({where: {email}})

    if(verify){
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Set OTP to expire in 10 minutes
        const otpExpiresIn = new Date(Date.now() + 10 * 60 * 1000).toISOString();
        // Generate a secure reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        await Password.create({
            restId: resetToken,
            userId : verify.id,
            otp: otp,
            otpExpiredTime: otpExpiresIn
        })

        async function main() {
             const mailOption = {
            from: "preyealexander731@gmail.com",
            to: email,
            subject: "Password reset Otp",
            html: `
                <div>
                    <p>Here is your otp. this is valid for 5 miunets</P>

                    <h1>${otp}</h1>
                   
                </div>
            `
        }

        await transporter.sendMail(mailOption)
        }

        main().catch(console.error);
       

        res.json({success: true, message: 'email verified. an otp has been sent to your email', token: resetToken})


    }else{
        res.json({message: `${email} was not found`})
    }
}

exports.otpValidate = async(req, res) => {
    const {token} = req.params
    const {otp} = req.body
    
    try {
        const validateToken = await Password.findOne({where: {restId: token}})

       if(!validateToken){
            res.json({mesage: "invalid token "})
       }

       if(otp != validateToken.otp){
        res.json({message: "invalid token"})
       }

       if(Date.now() >= validateToken.otpExpiredTime){
        res.json({message: 'Otp expired'})
       }

       const resetToken = crypto.randomBytes(32).toString('hex');

       await Password.update({
        restId: resetToken
       }, {where: {restId: validateToken.restId}})

       res.json({success: true, message: 'otp validated successfull', Token:resetToken})
        
    } catch (error) {
        console.log(error);
        res.json({message: 'something went wrong will processing your request'})
    }
    
}



exports.resendOtp = async(req, res) => {
    const {token} = req.params

    try {
        const validateToken = await Password.findOne({where: {restId: token}})

        if(!validateToken) {
            res.json({message: 'invalid token'})
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Set OTP to expire in 10 minutes
        const otpExpiresIn = new Date(Date.now() + 10 * 60 * 1000).toISOString();

        const Email = await Staffs.findOne({where: {id: validateToken.userId}})
        

        const mailOption = {
            from: "",
            to: Email.email,
            subject: "Password reset Otp",
            html: `
                <div>
                    <p>Here is your otp. this is valid for 5 miunets</P>

                    <h1>${otp}</h1>
                   
                </div>
            `
        }

         transporter.send(mailOption)

        await Password.update({
            otp: otp,
            otpExpiredTime: otpExpiresIn
        }, {where: {restId: token}})

        res.json({success: true})

    } catch (error) {
        console.log(error);
        res.json({message: 'someething went wrong'})
    }
}



exports.resetPassword = async(req, res) => {
    const {token} = req.params
    const {pwd} = req.body

    try {
        const validateToken = await Password.findOne({where: {restId: token}})

        if(!validateToken) {
            res.json({message: 'invalid token'})
        }

        const Email = await Staffs.findOne({where: {id: validateToken.userId}})
        
        const hashedPassword = await bcrypt.hash(pwd, 10)

        await Staffs.update({
            password: hashedPassword,
        }, {where: {email: Email.email}})

        await Password.destroy({where: {userId: validateToken.userId} })

        res.json({success: true, message: 'password has been changed'})

    } catch (error) {
        console.log(error);
        res.json({message: 'someething went wrong'})
    }
}



exports.deleteStaff = async(req, res) => {
    
    try {

        const {id} = req.params
        
        const userExists = await Staffs.findOne({where: {id}})

        if(!userExists){
            res.json({message: 'user does not exist'})
        }

        const deleteStaff = await Staffs.destroy({where: {id: id}})

        if(!deleteStaff){
            res.json({message: 'unable to complete request check your internet connection'})
        }
        
        res.json({sucess: true, message: `${userExists.name} has been deleted`})
        
    } catch (error) {
        console.log(error);
        res.json({message: 'something went wronf'})
    }
    
}