const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')
app.set('views','./views/coordinator')

app.get('/',(req,res)=>{
    res.render('login')
})



app.listen(port,()=> console.log('http://localhost:3000'))