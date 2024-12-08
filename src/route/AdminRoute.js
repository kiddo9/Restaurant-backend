const express = require('express')
const Route = express.Router()
const DishController = require('./../controllers/AdminController')

Route.post('/dishes', DishController.Menu);
Route.get('/getDishes', DishController.getMenu)

module.exports = Route