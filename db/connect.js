const mongoose = require('mongoose');
const CustomErr = require('../errors')

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }, (err) => {
        if (err) {
            throw new CustomErr.BadRequestErr(err.message)
        }
        console.log('mongo db connected successfully')
    })
}

module.exports = connectDB