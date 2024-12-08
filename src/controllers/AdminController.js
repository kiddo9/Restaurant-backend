const Upload = require('./../middleware/StorageMiddleware')
const Supabase = require('./../middleware/Supabase')
const Dish = require('./../../models/Dish')


//controller for getting all the dishes in the database
exports.getMenu = async (req, res) => {
    try {
        const getMenu = await Dish.findAll();

        res.json({Data: getMenu})
    } catch (error) {
        console.log(error);
        
    } 
}

//controller for creating and adding new dishes to the database
exports.Menu = [Upload.single("dishImage"), async (req, res) => { 

    try {
        
        const {dishName, dishPrice, Dishdescription} = req.body
        const file = req.file

        const {originalname, buffer , mimeType} = file;
        const filePath = `${Date.now()}_${originalname}`;

        await Supabase
        .storage
        .from('RImage')
        .upload(filePath, buffer, {
            contentType: mimeType,
            upsert: true
        })

        const {data} = Supabase
        .storage
        .from('RImage')
        .getPublicUrl(filePath)
        
        const Insertion = {
            dishName: dishName, 
            dishPrice: dishPrice, 
            Dishdescription: Dishdescription, 
            dishImage: data.publicUrl
        }

       const createDish = Dish.create(Insertion)

       if(createDish){
        res.json({Success: true, message: "Dish has been created successfully"})
       }else{
        res.json({Success: false, message: "An error occured will processing your request"})
       }
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
}]