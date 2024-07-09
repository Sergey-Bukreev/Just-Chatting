const mongoose = require('mongoose')

 async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const conection = mongoose.connection

        conection.on('connected', () => {
            console.log('connected to MongoDB');
        })
        conection.on('error', (err) => {
            console.log('some error on mongodb:', err.message);
        })
    }catch(err) {
        console.log('Something went wrong!' + err.message)
    }
 }
 module.exports = connectDB;