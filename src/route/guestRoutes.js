const express = require('express')
const Route = express.Router();
const ResgisterGuestControllerr = require('../controllers/GuestAuth')

Route.post('/GuestRegistration', ResgisterGuestControllerr.guestRegistration)
Route.post('/Auth', ResgisterGuestControllerr.guestLogin)
Route.get('/guests', ResgisterGuestControllerr.guests)
Route.delete('/guest/delete/:id', ResgisterGuestControllerr.deleteGuest)
Route.post('/guest/book', ResgisterGuestControllerr.bookTable)

module.exports = Route;