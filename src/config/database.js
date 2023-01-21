
const mongoose = require('mongoose');
mongoose.set('strictQuery', false) //deprecation warning supressed

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING)
        console.log(`MongoDB Connected`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB