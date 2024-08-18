const express = require('express')
const app = express()
const port = 3001
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')

const coordinatorRoute = require('./routes/routeCoordinator')
const adminRoute = require('./routes/routeAdmin')

app.use('/',coordinatorRoute)
// app.use('/admin',adminRoute)


app.listen(port,()=> console.log('http://localhost:3001'))