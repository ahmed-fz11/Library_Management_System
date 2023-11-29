import express from 'express';
const router = express.Router();

// Controllers
import { 
    addManager, 
    getAllManagers, 
    getOneManager, 
    updateManager, 
    deleteManager 
} from '../controllers/managerController.js';


// Routes
router.post('/add', addManager);
router.get('/', getAllManagers);
router.get('/:id', getOneManager);
router.put('/:id', updateManager);
router.delete('/:id', deleteManager);

export default router;

