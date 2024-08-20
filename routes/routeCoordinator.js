const express = require('express')
const coordinator_route = express()


coordinator_route.set('views','./views/coordinator')

//Controllers
const authController = require('../controllers/authController')

coordinator_route.get('/login',authController.loadLogin)
coordinator_route.get('/create-member',authController.loadCreateMember)
coordinator_route.post('/create-member',authController.createMember)

coordinator_route.get('/',(req,res)=>{
    res.render('homePage')
})
module.exports = coordinator_route