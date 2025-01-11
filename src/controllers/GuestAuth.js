const Guest = require('../../models/Guest')

//Guest user registartion request
exports.guestRegistration =  async (req, res) => {
    const { email } = req.body;
    
    try {
      const existingEmail = await Guest.findOne({where:{ guestemail: email}})
      if(existingEmail) {

        res.json({Exist: 'true'})
        console.log('already deyy');
      }else{
        let GuestId = GenerateId(10);
         Guest.create({
            guestemail: email,
            guestid: GuestId
        })
            console.log('guest created');
            res.json({success: 'true'})
      }
    } catch (error) {
        console.error(error);
    }

    function GenerateId(length) {
        let IdNumber = '1234567890';
        let IdGenerated = '';
    
        for(let i = 0; i < length; i++){
            let Id = Math.floor(Math.random() * IdNumber.length);
            IdGenerated += IdNumber[Id]
        }
    
        return IdGenerated
    }
    
}


//Guest Login request

exports.guestLogin = async (req, res) => {
  const {guestId} = req.body
  console.log(req.body);
  
  try {
    const existingId = await Guest.findOne({where: {guestid: guestId}})

    if(existingId) {
      res.json({success: 'true', message: 'Authentication successful. Click ok to proceed'})
    }else{
      res.json({message: 'Authentication failed. Guest not found'})
    }
  } catch (error) {
    console.log(error);
    res.json({message: 'Error code 500. Internal Server Error'})
  }
  
}

exports.guests = async(req, res) => {
   const guests = await Guest.findAll()

   res.json(guests);
   
}

