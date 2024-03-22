const dotenv = require('dotenv');
dotenv.config();
const express =require("express");
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const cookieParser =require('cookie-parser');
const mongoose =require('mongoose');
const connectDB = require('./config/dbConnection');
//connect to MongoDB
connectDB();
//Middleware verifyJWT to protect all of the routes in our API
const verifyJWT = require('./middleware/verifyJWT')
const PORT = process.env.PORT || 3500;
/* Middleware provided by 3rd party */
app.use(cors(corsOptions));
//middleware for cookies
app.use(cookieParser());
//built-in middleware to handle urlEncoded form data
app.use(express.urlencoded({extended:false}));
//built-in middleware for json
app.use(express.json());
/* Route Hanlders */
const register = require('./routes/register');
const authorization =require('./routes/authorization');
const refreshToken = require('./routes/refresh');
const logout = require('./routes/logout');
const employees =require('./routes/api/employees');
const users = require('./routes/api/users')
/* Routing using Expressjs "express.Router()" */
app.use('/register',register)
app.use('/authorization',authorization);
app.use('/refresh',refreshToken);
//we don't want to verifyJWT for logout
app.use('/logout',logout)
 //use verufyJWT  when we are fetching data from website
app.use(verifyJWT);
//below this line every route need jwt token to access
app.use('/employees',employees);
app.use('/users',users);


app.all("*",(req,res)=>{
    res.sendStatus(404);
})

mongoose.connection.once('open',()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{console.log(`My server is running on PORT${PORT}`)});

})


