const mongoose = require('mongoose')

// CREATING SCHEMA for USER

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    }
})

// CREATING MODEL for USER

const users = mongoose.model('users',userSchema)

module.exports = users