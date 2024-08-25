const Coordinator = require('../model/coordinatorSchema')
const Member = require('../model/memberSchema')
const Report = require('../model/reportSchema')


const loadEditMember = async(req,res)=>{
    try {
        const memberId = req.params.id;
        console.log(memberId);
        const member = await Member.findById(memberId)
        

        res.render('editMember',{member})
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const editMember = async(req,res)=>{
    try {
        let {id,Name,Email,Phone,Batch} = req.body
        Phone = Number(Phone)

        console.log(req.body);
        

        let member = await Member.findById(id)

        member.name = Name
        member.email = Email
        member.phone = Phone
        member.batch = Batch

        await member.save()

        return res.status(200).send("succes")

        
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const loadAttendenceSheet = async(req,res)=>{
    try {
        const members = await Member.find({})
        res.render('attendence',{members})
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const markAttendence = async (req, res) => {
    try {    
        console.log(req.body);

        for(let i = 0; i < req.body.members.length; i++){
            let memberId = req.body.members[i].id;
            let isPresent = req.body.members[i].attendance === "present";
            let participation = req.body.members[i].participation;

            // 
            let report = await Report.findOne({ memberId: memberId });

            if (report) {

                report.attendence.push({
                    date: req.body.attendanceDate,
                    isPresent: isPresent,
                    participation: participation
                });


                await report.save();
            } else {

                let newReport = new Report({
                    memberId: memberId,
                    attendence: [{
                        date: req.body.attendanceDate,
                        isPresent: isPresent,
                        participation: participation
                    }]
                });

                await newReport.save();
            }
        }

        res.status(200).send('Attendance recorded successfully.');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error recording attendance.');
    }
}







module.exports={
    loadEditMember,
    editMember,
    loadAttendenceSheet,markAttendence

}