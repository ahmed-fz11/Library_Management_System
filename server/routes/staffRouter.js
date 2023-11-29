import express from 'express';
const router = express.Router();
import {
    addStaff,
    getAllStaff,
    getOneStaff,
    updateStaff,
    deleteStaff,
    staffSignup,
    staffLogin
} from '../controllers/staffController.js';

// Routes
router.post('/add', addStaff);
router.post('/all', getAllStaff);
router.post('/get', getOneStaff);
router.post('/update', updateStaff);
router.delete('/delete', deleteStaff);
router.post('/signup', staffSignup); // Signup
router.post('/login', staffLogin);   // Login

export default router;
