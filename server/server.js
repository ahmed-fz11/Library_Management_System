import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
// Importing Routes 
const bookRouter = require('./routes/bookRoute');
const borrowedbooksRouter = require('./routes/borrowedbooksRoute');
const feedbackRouter = require('./routes/feedBackRoute');   
const managerRouter = require('./routes/managerRoute');
const staffRouter = require('./routes/staffRoute');
const studentRouter = require('./routes/studentRoute');

dotenv.config();

const app = express();

app.use(express.json())

app.use(cors())

// For Book Routes
app.use('/api/book', bookRouter);

// For BorrowedBooks Routes
app.use('/api/borrowedbooks', borrowedbooksRouter);

// For Feedback Routes
app.use('/api/feedback', feedbackRouter);

// For Manager Routes
app.use('/api/manager', managerRouter);

// For Staff Routes
app.use('/api/staff', staffRouter);

// For Student Routes
app.use('/api/student', studentRouter);

mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
    console.log("Connected to Database")
})})
.catch((error)=>{
    console.log(error)
})
console.log("rehbgj")
//Make your API calls for every usecase here

  