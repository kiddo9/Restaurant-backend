const Member = require('../../models/Members')

exports.MemberReg = async(req, res) => {
    const {email, username, password} = req.body
    console.log(req.body);
    
}