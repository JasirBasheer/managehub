const Coordinator = require('../../model/coordinatorSchema');
const bcrypt = require('bcrypt');

const addCoordinatorPage = async (req, res) => {
    try {
        const hello = await Coordinator.find({})
        console.log(hello, 'bdfiga');
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
module.exports = {
    addCoordinatorPage, addCoordinator
}