// import { Request, Response } from 'express';
import express from 'express';
// Mongoose Model
import Student from '../models/student.js';

// Add a new student
export const addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all students
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get one student
export const getOneStudent = async (req, res) => {
    try {
        const studentId = req.body.id;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a student
export const updateStudent = async (req, res) => {
    try {
        const studentId = req.body.id;
        const student = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a student
export const deleteStudent = async (req, res) => {
    try {
        const studentId = req.body.id;
        const student = await Student.findByIdAndDelete(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Student Signup
export const studentSignup = async (req, res) => {
    try {
        // console.log("In signup student")
        // console.log(req.body)
        const { email, password } = req.body;
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ error: 'email already exists' });
        }
        const newStudent = await Student.create( req.body );
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Student Login
export const studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        if (student.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};