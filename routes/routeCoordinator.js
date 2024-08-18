const express = require('express')
const coordinatorRoute = express()

coordinatorRoute.set('views','./views/coordinator')

coordinatorRoute.get('/login',(req,res)=>{
    res.render('login')
})
coordinatorRoute.get('/',(req,res)=>{
    res.render('homePage')
})
module.exports = coordinatorRoute