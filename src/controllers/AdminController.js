const Upload = require('./../middleware/StorageMiddleware')
const Supabase = require('./../middleware/Supabase')
const Dish = require('./../../models/Dish');




//controller for getting all the dishes in the database
exports.getMenu = async (req, res) => {
    try {
        const getMenu = await Dish.findAll();

        res.json(getMenu)
    } catch (error) {
        console.log(error);
        
    } 
}

exports.getSpecificDish = async(req, res) => {
    const {id} = req.params

    const dish = await Dish.findByPk(id)

    return res.json({dish: dish})
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
        .from('rImage')
        .upload(filePath, buffer, {
            contentType: mimeType,
            upsert: true
        })

        const {data} = Supabase
        .storage
        .from('rImage')
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


//controller function to delete dish from database
exports.DeleteDish = async (req, res) => {
    const {id} = req.params
    
    try {
        const exist = await Dish.findByPk(id)
        if(exist){
            
            const imagePath = exist.dishImage
            const name = imagePath.split("/storage/v1/object/public/rImage/",-1)[1]
            
            const deleteImage = await Supabase
                                .storage
                                .from("rImage")
                                .remove([name])

            if(deleteImage){
               await Dish.destroy({where: {id: id}})
               res.json({success: true, message: `${exist.dishName} has been deleted`})
            }else{
                res.json({message: 'something when wrong while processing your request'})
            }
            
        }else{
            res.json({message: "unauthorized access"})
        }
        
        
    } catch (error) {
        console.log(error);
        res.json({message: "internal server error"})
    }
}

//controller to delete image 
exports.deleteImage = async (req, res) => {
        const {id} = req.params
        const image = await Dish.findByPk(id) 
            
        try {
            
            const dishImage = image.dishImage
            const Image = dishImage.split("/storage/v1/object/public/rImage/",-1)[1]

            const deleteFromStorage = await Supabase
                                        .storage
                                        .from("rImage")
                                        .remove([Image])

            if(deleteFromStorage){
                await Dish.update({dishImage: ''}, {where: {id: id}})
                return res.json({success: true, message: 'image deleted'})
            }else{
                return res.json({message: 'unable to delete image'})
            }
            

        } catch (error) {
            console.log(error);
            res.json({message: 'internal server error'})
        }
}


exports.editDish = async(req, res) => {
    const {dishName, dishPrice, Dishdescription, id} = req.body
    const prefix = 'https://irkrmdwtasxwzpfiuxja.supabase.co/storage/v1/object/public/rImage'

    try {

        const updateDish = {
            dishName: dishName,
            dishPrice: dishPrice,
            Dishdescription: Dishdescription
        }

      const updateRow = await Dish.update(updateDish, {where: {id: id}})

      if(updateRow){
        res.json({success: true, message: 'dish has been updated'})
      }else{
        res.json({message: 'unable to update data'})
      }
        
    } catch (error) {
        res.json({message: 'internal server error'})
    }
  
}

exports.editDishImage = async(req, res) => {
    try {
        const file = req.file; // File info from multer
        

        console.log('File details:', file);

     
    } catch (error) {
        console.error('Error processing request:', error);
        
    }
    
}