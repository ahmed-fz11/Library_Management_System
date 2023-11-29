import express from 'express';
const router = express.Router();
import {
    addManager,
    getAllManagers,
    getOneManager,
    updateManager,
    deleteManager,
    managerSignup,
    managerLogin
} from '../controllers/managerController.js';

// Routes
router.post('/add', addManager);
router.post('/all', getAllManagers);
router.post('/get', getOneManager);
router.post('/update', updateManager);
router.delete('/delete', deleteManager);
router.post('/signup', managerSignup); // Signup
router.post('/login', managerLogin);   // Login

export default router;
