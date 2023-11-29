import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
// Importing Routes 
import bookRouter from './routes/bookRouter.js';
import borrowedbooksRouter from './routes/borrowedbooksRouter.js';
import feedbackRouter from './routes/feedbackRouter.js';
import managerRouter from './routes/managerRouter.js';
import staffRouter from './routes/staffRouter.js';
import studentRouter from './routes/studentRouter.js';


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

  