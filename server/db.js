const mongoose = require('mongoose')

const connectToMongo = async()=>{
    const url = "mongodb+srv://devireddysairishikar2003:rishikar@cluster0.zenpony.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(url)
    console.log('connected to mongo db')
}

module.exports = connectToMongo