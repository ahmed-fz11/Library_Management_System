import express from 'express';
const router = express.Router();

import {
    addStaff,
    getAllStaff,
    getOneStaff,
    updateStaff,
    deleteStaff
} from '../controllers/staffController.js';

// Routes
router.post('/add', addStaff);
router.post('/all', getAllStaff);
router.post('/get', getOneStaff);
router.post('/update', updateStaff);
router.delete('/delete', deleteStaff);

export default router;
