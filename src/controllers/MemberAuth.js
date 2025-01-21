const Member = require('../../models/Members')
const bcrypt = require('bcrypt')
const Guest = require('../../models/Guest')
const GenerateId = require('../utils/tokenFunction')
const Jwt = require('jsonwebtoken')

exports.MemberReg = async(req, res) => {

    const {email, username, password} = req.body
    const membershipToken = GenerateId(15)

    try {

        const emailExist = await Member.findOne({where: {email}})

        if(emailExist){
           return res.json({message: 'email has already been used'})
        }

        const emailExistInGuestTable = await Guest.findOne({where: {guestemail: email}})

        if(emailExistInGuestTable){
            await Guest.destroy({where: {guestemail: email}})
        }

         const allUsers = await Member.findAll()

         for(const user of allUsers){
            const anyMatch = await bcrypt.compare(password, user.password)

            if(anyMatch){
                return  res.json({message: 'password has already been used'})
            }
            break
         }

        const user = {
            email,
            username,
            password: hashPassword,
            token: membershipToken
        }

        await Member.create(user)
        
        res.json({success: true, message: 'membership account has been created'})

        console.log(user);
        
        
    } catch (error) {
        console.log(error);
        res.json({message: 'server error'})
    }
}


exports.MemberLogin = async(req, res) => {
    const {MST, password} = req.body

    try {
        const isMembershipTokenExist = await Member.findOne({where: {token: MST}})

        if(!isMembershipTokenExist){
            return res.json({message: 'token does not exist check your email'})
        }

        const checkPassword = await bcrypt.compare(password, isMembershipTokenExist.password)

        if(!checkPassword){
            return res.json({message: 'invaild password'})
        }

        const token = Jwt.sign({id: isMembershipTokenExist.id, username: isMembershipTokenExist.username}, process.env.JWTSECRETKEY, {expiresIn: "24h"})

        return res.json({success: true, message: 'login successfull', token: token})
    } catch (error) {
        console.log(error);
        return res.json({message: 'server error'})
    }
    
}

exports.verifyToken = async(req, res) => {
    const token = req.headers['authorization']
 
    try {
        const decoded = Jwt.verify(token, process.env.JWTSECRETKEY)
        req.user = decoded

        console.log(decoded);
        
       return res.json({success: true})
    } catch (error) {
        console.log(error);
        return res.json({message: 'something went wrong'})
    }
    
}

exports.members = async(req, res) => {
    const members = await Member.findAll()
    res.json({members: members})
}



exports.deleteMember = async(req, res) => {
    const {id} = req.params
    
    try {
        const findMember = await Member.findOne({where: {id: id}})

        if(!findMember){
            return res.json({message: 'no data found'})
        }

        const destroyMember = await Member.destroy({where: {id: id}})

        if(!destroyMember){
            return res.json({message: 'unable to complete request'})
        }

       return res.json({success: true, message: `${findMember.username} has been delete`})

    } catch (error) {
        console.log(error);
        return res.json({message: 'something wrong'})
    }
    
}