import express from 'express';
const router = express.Router();

// Controllers
import { 
    addStaff, 
    getAllStaff, 
    getOneStaff, 
    updateStaff, 
    deleteStaff 
} from '../controllers/staffController.js';


// Routes
router.post('/add', addStaff);
router.get('/', getAllStaff);
router.get('/:id', getOneStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

export default router;

