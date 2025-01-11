const Staffs = require('./../../models/staffs')


exports.staffregistration = async(req, res) => {
    const {name, email, mobile, type} = req.body

    try {
        const existingEmail = await Staffs.findOne({where: {email: email}})

        if(existingEmail){
            res.json({message: 'Email already exist'})
        }else{
            await Staffs.create({name, email, mobile, type})
            res.json({success: true, message: `${name}'s profile has been create`})
        }

    } catch (error) {
        console.log(error);
        res.json({message: 'internal server error'})
    }
}

exports.Staffs = async(req, res) => {
    const staffs = await Staffs.findAll()
    
    res.json(staffs)
}