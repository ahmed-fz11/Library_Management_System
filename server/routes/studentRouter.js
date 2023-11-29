import express from 'express';
const router = express.Router();

// Controllers
import { 
    addStudent, 
    getAllStudents, 
    getOneStudent, 
    updateStudent, 
    deleteStudent 
} from '../controllers/studentController.js';


// Routes
router.post('/add', addStudent);
router.get('/', getAllStudents);
router.get('/:id', getOneStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;

