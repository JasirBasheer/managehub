const Coordinator = require('../model/coordinatorSchema')
const Member = require('../model/memberSchema')
const Report = require('../model/reportSchema')



const loadLogin = async(req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error);
        
    }
}

const loadMembers = async(req,res)=>{
    try {
        const members = await Member.find({})
        res.render('viewMembers',{members})
    } catch (error) {
        console.log(error);
        
    }
}

const loadCreateCoordinator = async(req,res)=>{
    try {
        res.render('createCoordinator')
    } catch (error) {
        console.log(error);
        
    }
}

const loadCreateMember = async(req,res)=>{
    try {
        res.render('createMember')
    } catch (error) {
        console.log(error);
        
    }
}

const createCoordinator = async(req,res)=>{
    try {
        const { Name,Email,Phone,Password,Batch } = req.body
        
        if(Name.trim()==""){
            return res.status(200).json({message:"Enter a Valid Name"})
        }

        if(Email.trim()==""){
            return res.status(200).json({message:"Enter a Valid Name"})
        }

        if(Phone.trim()==""){
            return res.status(200).json({message:"Enter a Valid Name"})
        }

        if(Password.trim()==""){
            return res.status(200).json({message:"Enter a Valid Name"})
        }


        const coordinator = new Coordinator({
            name:Name,
            email:Email,
            phone,Phone,
            batch:Batch,
            password:Password
        }) 

        await coordinator.save()

        console.log('coordinator Created successfully');
  
    } catch (error) {
        
    }
}

const createMember = async(req,res)=>{
    try {
        const { Name,Email,Phone,Batch } = req.body
        console.log(req.body);
        console.log(Name,Email,Phone,Batch);
        const phone=parseInt(Phone)
        
        let member = new Member({
            name: Name,
            email: Email,
            phone: phone,
            batch: Batch,
        });

        const saveMember = await member.save();

        let report = new Report({
            memberId:saveMember._id,
            name:saveMember.name,
            batch:saveMember.batch
        })
        await report.save()


        
        console.log('Member created successfully');
        res.status(201).json({ message: 'Member created successfully' });
   
    } catch (error) {
        console.log(error.message);
        
        
    }
}


module.exports={
    loadLogin,
    loadCreateCoordinator,
    loadCreateMember,
    createCoordinator,
    createMember,
    loadMembers,
    

}