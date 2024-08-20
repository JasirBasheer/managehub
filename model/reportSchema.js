const mongoose = require('mongoose')
 
const reportSchema =new mongoose.Schema({
    memberId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
    },
    attendence:[{
        date:{
            type: Date,
        },
        isPresent:{
            type:Boolean
        },
        isAbsent:{
            type:Boolean
        }


    }],

})

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
