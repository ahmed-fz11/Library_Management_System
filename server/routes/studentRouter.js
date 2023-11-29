import express from 'express';
const router = express.Router();

import {
    addStudent,
    getAllStudents,
    getOneStudent,
    updateStudent,
    deleteStudent,
    studentSignup,
    studentLogin
} from '../controllers/studentController.js';

// Routes
router.post('/add', addStudent);
router.post('/all', getAllStudents); 
router.post('/get', getOneStudent); 
router.post('/update', updateStudent); 
router.delete('/delete', deleteStudent);
router.post('/signup', studentSignup); 
router.post('/login', studentLogin);  

export default router;
