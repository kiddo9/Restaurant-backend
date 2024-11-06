const express = require('express')
const Route = express.Router()
const memberReq = require('../controllers/MemberAuth') 

Route.post('membershipReg', memberReq.MemberReg)

module.exports = Route