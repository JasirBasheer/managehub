const express = require('express')
const adminRoute = express()

adminRoute.set('views','./views/admin')

adminRoute.get('/login',(req,res)=>{
    res.render('login')
})
adminRoute.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

module.exports = adminRoute