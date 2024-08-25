const express = require('express')
const coordinator_route = express()


coordinator_route.set('views','./views/coordinator')

//Controllers
const authController = require('../controllers/authController')
const coordinatorController = require('../controllers/coordinatorController')

coordinator_route.get('/login',authController.loadLogin)
coordinator_route.get('/members',authController.loadMembers)
coordinator_route.get('/create-member',authController.loadCreateMember)
coordinator_route.get('/attendence',coordinatorController.loadAttendenceSheet)

coordinator_route.post('/create-member',authController.createMember)
coordinator_route.post('/submit-attendance',coordinatorController.markAttendence)
coordinator_route.get('/edit-member/:id',coordinatorController.loadEditMember)
coordinator_route.post('/edit-member',coordinatorController.editMember)

coordinator_route.get('/',(req,res)=>{
    res.render('homePage')
})
module.exports = coordinator_route