const express = require('express')
const Route = express.Router()
const memberReq = require('../controllers/MemberAuth') 

Route.post('/api/v1/membershipReg', memberReq.MemberReg)
Route.post('/Auth/member', memberReq.MemberLogin)
Route.get('/verifyToken', memberReq.verifyToken)
Route.get('/members', memberReq.members)
Route.delete('/member/delete/:id', memberReq.deleteMember)

module.exports = Route