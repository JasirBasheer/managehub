// const { default: mongoose } = require('mongoose');
const Coordinator = require('../../model/coordinatorSchema');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const addCoordinatorPage = async (req, res) => {
    try {
        // const hello = await Coordinator.find({})
        // console.log(hello)
        res.render('addCoordinator')
    } catch (error) {
        res.status(200).json({ error })
    }
}
const addCoordinator = async (req, res) => {
    const { name, phone, batch, email } = req.body;
    const imagePath = req.file ? req.file.path.replace(/^public/, '').replace(/^[\\\/]*/, '/') : '/images/User.png';
    const password = generateStrongPassword()

    const hashedPassword = await hashPassword(password)
    const addNewCoordinator = new Coordinator({
        name,
        email,
        phone,
        batch,
        image: imagePath,
        password:hashedPassword
    })
    await addNewCoordinator.save()



    res.json({ success: true, message: 'Form submitted successfully', imagePath });
}
function generateStrongPassword(length = 8) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
    const allChars = uppercase + lowercase + numbers + specialChars;

    if (length < 8) {
        throw new Error('Password length should be at least 8 characters.');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
}
async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
const getCoordinators = async (req, res) => {
    try {
        const coordinators = await Coordinator.find({});
        res.status(200).json({ coordinators });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching coordinators.' });
    }
};
// const viewCoordinators = async (req, res) => {
//     try {
//         const { search = '', sort = 'name-asc' } = req.query;
//         let sortOption = {};

//         switch (sort) {
//             case 'name-asc':
//                 sortOption = { name: 1 };
//                 break;
//             case 'name-desc':
//                 sortOption = { name: -1 };
//                 break;
//             case 'batch-asc':
//                 sortOption = { batch: 1 };
//                 break;
//             case 'batch-desc':
//                 sortOption = { batch: -1 };
//                 break;
//         }

//         const coordinators = await Coordinator.find({
//             name: new RegExp(search, 'i')
//         }).sort(sortOption);

//         res.render('getCoordinators', { coordinators }); 
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };
const editCoordinatorPage = async (req,res)=>{
    try{
        const coordinators = await Coordinator.find({})
        res.render('editCoordinator',{coordinators})
    }catch(error){
        res.status(500).json({error})
    }
}
const editCoordinator = async(req,res)=>{
    try{
        console.log(req.body);
        const { name, batch, email, id, phone, image } = req.body;
        const imagePath = req.file ? req.file.path.replace(/^public/, '').replace(/^[\\\/]*/, '/') : '/images/User.png';
        const editCoor = await Coordinator.updateOne(
            { _id: id },
            {
                $set: {
                    name,
                    batch,
                    email,
                    phone,
                    image:imagePath 
                }
            }
        );
        console.log(editCoor,'ghj');
        if (editCoor.modifiedCount > 0) {
            res.status(200).json({ success: true, message: 'Coordinator details updated successfully' });
        } else {
            res.status(200).json({ success: false, message: 'No changes made to coordinator details' });
        }
    }catch(error){
        res.status(500).json({error})
    }
}
module.exports = {
    addCoordinatorPage, addCoordinator, getCoordinators, editCoordinatorPage,editCoordinator
}