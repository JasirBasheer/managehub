const mongoose = require('mongoose')
 
const reportSchema =new mongoose.Schema({
    memberId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
    },
    name:{
        type:String
    },
    batch:{
        type:String
    },
    attendence:[{
        date:{
            type: Date,
        },
        isPresent:{
            type:Boolean
        },
        participation:{
            type:String,
            enum:['Very Active','Not Active','Average']
        }
    }],
    audioTask:[{
        date:{
            type:Date,
        },
        task:{
            type:String,
            enum:['Done','Not-Done']
        }

    }]

})

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
