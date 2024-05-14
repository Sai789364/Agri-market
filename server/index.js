const express = require('express')
const auth = require('./routes/auth')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json())
connectToMongo(); 
app.use('/api/auth',auth)
app.listen(5000,()=>{
    console.log('app running on port 5000')
})