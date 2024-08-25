const loginPage = async(req,res)=>{
    try{
        res.render('login')
    }catch(error){
        res.status(200).json({error})
    }
}
const dashboard = async(req,res)=>{
    try{
        res.render('dashboard')
    }catch(error){
        res.status(200).json({error})
    }
}
module.exports ={
    dashboard,loginPage
}