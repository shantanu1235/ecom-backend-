const  express = require('express');
const databaseconnect = require('./Config/dbConfig');
const authrouter = require('./Routes/routes');
const cors =require('cors')
const app = express();
const cookie =require('cookie-parser')


databaseconnect()

app.use(cors({
    origin:['http://localhost:5173','https://ecommerce3433.netlify.app/'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}))
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));
// app.use(express.urlencoded({ extended: true }))
app.use('/api/auth',authrouter);
app.use(cookie())

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
