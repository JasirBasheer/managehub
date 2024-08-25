const mongoose = require('mongoose')

const coordinatorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    password:{
        type:String
    },
    isExpire:{
        type:Boolean,
        default:false
    }
    
})

module.exports= mongoose.model('Coordinator',coordinatorSchema)