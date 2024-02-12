// Loads .env file contents into process.env by default.

require('dotenv').config()

// SERVER CREATION!!!!

const express = require('express')
const cors = require('cors')
const router = require('./Routes/routes')
require('./DB/connection')

const pfServer = express()

pfServer.use(cors())
// Application specific middleware
pfServer.use(express.json())
pfServer.use(router)


// we can use server file or folder to another appliation 
pfServer.use('/uploads',express.static('./uploads'))


// THIS WAY TO HOST or  SEE OUR APPLICATION IN THE PORT 3000

const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Project fair server started at PORT :${PORT}`);
})

// SEVER  RESOLVING A REQUEST

pfServer.get('/',(req,res)=>{
    res.status(200).send("<h1>Project Fair Server Started!!! Waiting For Client Request....</h1>")
})