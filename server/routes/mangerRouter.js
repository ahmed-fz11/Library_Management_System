import express from 'express';
const router = express.Router();

// Controllers
const { 
    addManager, 
    getAllManagers, 
    getOneManager, 
    updateManager, 
    deleteManager 
} = require('../controllers/managerController');

// Routes
router.post('/add', addManager);
router.get('/', getAllManagers);
router.get('/:id', getOneManager);
router.put('/:id', updateManager);
router.delete('/:id', deleteManager);

module.exports = router;
