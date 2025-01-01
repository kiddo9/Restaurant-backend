const express = require('express')
const Route = express.Router()
const DishController = require('./../controllers/AdminController')

Route.post('/dishes', DishController.Menu);
Route.get('/getDishes', DishController.getMenu)
Route.delete('/delete/dish/:id', DishController.DeleteDish)
Route.get('/dish/:id', DishController.getSpecificDish)
Route.delete('/delete/image/:id', DishController.deleteImage)
Route.put('/update', DishController.editDish)
Route.put('/update/image', DishController.editDishImage)

module.exports = Route