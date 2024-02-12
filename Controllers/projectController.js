
const projects = require('../Models/projectModel')

// ADD PROJECT

exports.addProjects = async (req, res) => {
    console.log("Inside Add Projec API");

    const { title, languages, overview, github, website } = req.body
    const projectImage = req.file.filename
    const userId = req.payload
    console.log(title, languages, overview, github, website, projectImage, userId);

    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project Already Exist in our Collections!!! Please Upload another....")

        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
        
    }catch(err){
        res.status(401).json(err)
    }
}

// Get Home Page Projects

exports.getHomeProjects = async (req,res)=>{
    try{
        const allProjects = await projects.find().limit(3)
        res.status(200).json(allProjects)

    }catch(err){
        res.status(401).json(err)
    }
}




// GET ALL PROJECTS

exports.getAllProjects = async (req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        languages:{ $regex:searchKey, $options:"i" }
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)

    }catch(err){
        res.status(401).json(err)
    }
}


// GET USER PROJECTS

exports.getUserProjects = async (req,res)=>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)

    }catch(err){
        res.status(401).json(err)
    }
}


// EDIT PROJECTS

exports.editProject = async (req,res)=>{
    const { title, languages, overview, github, website,projectImage } = req.body
    const uploadImage = req.file?req.file.filename:projectImage
    const userId = req.payload
    const {pid} = req.params
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{
            title,languages,overview,github,website,projectImage:uploadImage,userId

        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(err){
        res.status(401).json(err)
    }
}

// Remove Project

exports.removeProject = async (req,res)=>{
    const {pid} = req.params
    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)

    }catch(err){
        res.status(401).json(err)
    }
}