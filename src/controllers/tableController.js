
const tables = require("../../models/tables");
const Upload = require("../middleware/StorageMiddleware");
const supaBase = require("../middleware/Supabase");

exports.tables =[Upload.single("tableImage"), async(req, res) => {
    const {tableName, tableLocation, tableNumber, tableType} = req.body
    const file = req.file

    const  {originalname, buffer, mimeType} = file
    const filePath = `${Date.now()}_${originalname}`

    try {
        const storeFile = await supaBase 
                        .storage 
                        .from('rImage') 
                        .upload(filePath, buffer, {
                            contentType: mimeType,
                            upsert: true
                        })

        if(storeFile){

            const {data} = supaBase 
                            .storage 
                            .from('rImage') 
                            .getPublicUrl(filePath)


            const insertData = {
                tableName: tableName,
                tableLocation: tableLocation,
                tableNumber: tableNumber,
                tableType: tableType,
                tableImage: data.publicUrl
            }

            await tables.create(insertData)

            res.json({success: true, message: 'Table added successfully'})
        }else{
            res.json({message: 'unable to store filr'})
        }
    } catch (error) {
        console.log(error);
        res.json({message: 'internal server error'})
    }
}]

exports.getTables = async(req, res) => {
    const getTables = await tables.findAll()

    res.json(getTables)
}

exports.deleteTable = async(req, res) => {
    const {id} = req.params
    const table = await tables.findByPk(id)

    try {

        const Image = table.tableImage.split("/storage/v1/object/public/rImage/",-1)[1]
   
        const deleteStoredImage = await supaBase 
        .storage 
        .from('rImage') 
        .remove([Image])
        
        if(deleteStoredImage){
            await tables.destroy({where: {id: id}})

            res.json({success: true, message: `${table.tableName} has been deleted`})
        }else{
            res.json({message: 'unable to process request'})
        }

    } catch (error) {
        console.log(error);
        res.json({message: 'internal server error'})
    }

    
}

exports.editTable = async(req, res) => {
    const id = req.params.id
    const tableDetails = await tables.findByPk(id)

    res.json({table: tableDetails})
    
}

exports.deleteImage = async(req, res) => {
    const {id} = req.params
    const table = await tables.findByPk(id)

    try {

        const Image = table.tableImage.split("/storage/v1/object/public/rImage/",-1)[1]
   
        const deleteStoredImage = await supaBase 
        .storage 
        .from('rImage') 
        .remove([Image])
        
        if(deleteStoredImage){
            await tables.update({tableImage: ''},{where: {id: id}})

            res.json({success: true, message: `image has been deleted`})
        }else{
            res.json({message: 'unable to process request'})
        }

    } catch (error) {
        console.log(error);
        res.json({message: 'internal server error'})
    }
}

exports.updateTable =  async(req, res) => {
    try {
        
        const {tableName, tableLocation, tableNumber, tableType, id} = req.body   
         
            await tables.update({
                tableName: tableName,
                tableLocation: tableLocation,
                tableNumber: tableNumber,
                tableType: tableType
            }, {where: {id: id}})

            res.json({success: true, message: 'Details updated'})

    } catch (error) {
        console.log('error', error);
        res.status(500).json({message: 'something went wrong'})

    }
    
}

exports.updateTableImage = [Upload.single('tableImage'), async(req, res) => {
    const {id} = req.params
    const file = req.file
    const {originalname, buffer, mimeType} = file
    const filePath = `${Date.now()}_${originalname}`

    try {
        const uploadImage = await supaBase 
        .storage 
        .from('rImage') 
        .upload(filePath, buffer, {
            contentType: mimeType,
            upsert: true
        })

        if(uploadImage){

            const {data} = supaBase 
            .storage 
            .from('rImage') 
            .getPublicUrl(filePath)

            await tables.update({tableImage: data.publicUrl}, {where: {id: id}})

            res.json({success: true, message: 'Image has been uploaded and updated successfully'})
        }else{
            res.json({message: 'unable to complete request. check your internet connenction'})
        }

    } catch (error) {

        console.log(error);
        res.status(500).json({message: 'something went wrong'})
        
    }
    
}]