const Coordinator = require('../model/coordinatorSchema')
const Member = require('../model/memberSchema')


const loadEditMember = async(req,res)=>{
    try {
        const {memberId} = req.body

        const member = await Member.findById(memberId)

        res.render('editMember')
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const editMember = async(req,res)=>{
    try {
        const {memberId,Name,Email,Phone,Batch} = req.body

        let member = await Member.findById(memberId)

        member.name = Name
        member.email = Email
        member.phone = Phone
        member.batch = Batch

        await member.save()


        
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const loadAttendenceSheet = async(req,res)=>{
    try {
        const member = await Member.find({})
        res.render('attendence',{member})
        
    } catch (error) {
        console.log(error.message);
        
    }
}
module.exports={
    loadEditMember,
    editMember,
    loadAttendenceSheet

}