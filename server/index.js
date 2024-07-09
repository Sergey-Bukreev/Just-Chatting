const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');

const app = express();
const corsOptions = {
    origin: ['http://localhost:5173', process.env.FRONTEND_URL],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running!',
    })
})

const PORT = process.env.PORT || 8080;
/// api endpoints
app.use('/api', router)
connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log('server started on port' + PORT);
    })
})
