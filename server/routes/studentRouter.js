import express from 'express';
const router = express.Router();

// Controllers
const { 
    addStudent, 
    getAllStudents, 
    getOneStudent, 
    updateStudent, 
    deleteStudent 
} = require('../controllers/studentController');

// Routes
router.post('/add', addStudent);
router.get('/', getAllStudents);
router.get('/:id', getOneStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
