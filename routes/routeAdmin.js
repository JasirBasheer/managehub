const express = require('express')
const adminRoute = express()

adminRoute.set('views','./views/admin')
adminRoute.use(express.urlencoded({ extended: true }));


const adminController = require('../controllers/adminController/adminController')
const coordinatorController = require('../controllers/adminController/coordinatorController')
const upload = require('../middlewares/addCoordinatorMulter')

adminRoute.get('/login',adminController.loginPage)
adminRoute.get('/dashboard',adminController.dashboard)

//coordinators
adminRoute.get('/addCoordinator',coordinatorController.addCoordinatorPage)
adminRoute.post('/addCoordinator', upload.single('image'), coordinatorController.addCoordinator)


module.exports = adminRoute