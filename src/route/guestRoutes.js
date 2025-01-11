const express = require('express')
const Route = express.Router();
const ResgisterGuestControllerr = require('../controllers/GuestAuth')

Route.post('/GuestRegistration', ResgisterGuestControllerr.guestRegistration)
Route.post('/Auth', ResgisterGuestControllerr.guestLogin)
Route.get('/guests', ResgisterGuestControllerr.guests)

module.exports = Route;