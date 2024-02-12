
const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
// ROUTE FOR REGISTER

router.post('/register',userController.register)

// ROUTE FOR LOGIN

router.post('/login',userController.login)
// router specific middleware
// ADD PROJECT

router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

// get home projects

router.get('/home-projects',projectController.getHomeProjects)

// get all projects

router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)

// get user Projects

router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)

// edit Project

router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProject)

// delete project

router.delete('/project/remove/:pid',jwtMiddleware,projectController.removeProject)

// update user

router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)


module.exports = router