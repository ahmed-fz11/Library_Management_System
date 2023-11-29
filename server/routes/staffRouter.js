import express from 'express';
const router = express.Router();

// Controllers
const { 
    addStaff, 
    getAllStaff, 
    getOneStaff, 
    updateStaff, 
    deleteStaff 
} = require('../controllers/staffController');

// Routes
router.post('/add', addStaff);
router.get('/', getAllStaff);
router.get('/:id', getOneStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

module.exports = router;
