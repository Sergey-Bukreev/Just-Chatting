const mongose = require('mongose')

 async function connectDB() {
    try {
        await mongose.connect(process.env.MONGODB_URI, {});
        const conection = mongose.connection

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