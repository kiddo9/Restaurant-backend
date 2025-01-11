const express = require('express')
const Route = express.Router()
const DishController = require('./../controllers/AdminController')
const tableController = require('./../controllers/tableController')
const adminUser = require('./../controllers/adminUsers')

Route.post('/dishes', DishController.Menu);
Route.get('/getDishes', DishController.getMenu)
Route.delete('/delete/dish/:id', DishController.DeleteDish)
Route.get('/dish/:id', DishController.getSpecificDish)
Route.delete('/delete/image/:id', DishController.deleteImage)
Route.put('/update', DishController.editDish)
Route.put('/update/image/:id', DishController.editDishImage)


Route.post('/add/table', tableController.tables)
Route.get('/tables', tableController.getTables)
Route.delete('/delete/table/:id', tableController.deleteTable)
Route.get('/table/:id', tableController.editTable)
Route.delete('/delete/image/table/:id', tableController.deleteImage)
Route.put('/update/table', tableController.updateTable)
Route.put('/update/tableImage/:id', tableController.updateTableImage)

Route.post('/staffregistration', adminUser.staffregistration)
Route.get('/staffs', adminUser.Staffs)

module.exports = Route