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
Route.post('/staffs/setpassword/:email', adminUser.setPassword)
Route.post('/login/admin', adminUser.loginAdmin)
Route.post('/login/staff', adminUser.loginStaff)
Route.get('/tokenverify', adminUser.verifyToken)
Route.post('/admin/email/verify', adminUser.emailVerification)
Route.post('/admin/otp/verify/:token', adminUser.otpValidate)
Route.post('/otp/resend/:token', adminUser.resendOtp)
Route.post('/staff/resetpassword/:token', adminUser.resetPassword)
Route.delete('/admin/delete/:id', adminUser.deleteStaff)

module.exports = Route