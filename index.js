const express = require("express")
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
require('./src/helpers/passport')(passport)
const router=require('./src/routes/index')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))


const mongoose = require('mongoose');


// const CONNECTION_STRING = "mongodb://localhost:27017/real-time-app"
 const CONNECTION_STRING = "mongodb+srv://vysh:VYsh131606*@cluster0.ewzdj.mongodb.net/test"

mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error',()=>{
    console.log("Error in database connection")
}) 
mongoose.connection.once('open',function(){
    console.log("DB connection established")
})


app.listen(5000,function(){
    console.log("LISTENING AT PORT 5000")
})
  

app.use("/api/v1", router)