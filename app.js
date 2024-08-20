const express = require('express')
const app = express()
const port = 3001
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jasirbinbasheerpp:1iHZbpyV6o25idyM@managehub.s1f2n.mongodb.net/managehub?retryWrites=true&w=majority&appName=managehub')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));


app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')

const coordinatorRoute = require('./routes/routeCoordinator')
const adminRoute = require('./routes/routeAdmin')

app.use('/',coordinatorRoute)
// app.use('/admin',adminRoute)


app.listen(port,()=> console.log('http://localhost:3001'))