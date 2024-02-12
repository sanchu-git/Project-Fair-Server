
const mongoose = require('mongoose')
const connectionString = process.env.connectionString
mongoose.connect(connectionString).then(()=>{
        console.log("MongoDb Atless Connected With PFServer");
    }
).catch((err)=>{
    console.log("MongoDb Connection Failed!!!",err);
})