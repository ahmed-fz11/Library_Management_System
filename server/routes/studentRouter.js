import express from 'express';
const router = express.Router();

import {
    addStudent,
    getAllStudents,
    getOneStudent,
    updateStudent,
    deleteStudent
} from '../controllers/studentController.js';

// Routes
router.post('/add', addStudent);
router.post('/all', getAllStudents); 
router.post('/get', getOneStudent); 
router.post('/update', updateStudent); 
router.post('/delete', deleteStudent); 

export default router;
