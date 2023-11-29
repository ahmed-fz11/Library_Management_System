// import { Request, Response } from 'express';
import express from 'express';
// Mongoose Model
import Staff from '../models/staff.js';

// Add a new staff member
export const addStaff = async (req, res) => {
    try {
        const staff = await Staff.create(req.body);
        res.status(201).json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all staff members
export const getAllStaff = async (req, res) => {
    try {
        const staffMembers = await Staff.find();
        res.status(200).json(staffMembers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get one staff member
export const getOneStaff = async (req, res) => {
    try {
        const staffId = req.body.id;
        const staff = await Staff.findById(staffId);
        if (!staff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a staff member
export const updateStaff = async (req, res) => {
    try {
        const staffId = req.body.id;
        const staff = await Staff.findByIdAndUpdate(staffId, req.body, { new: true });
        if (!staff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a staff member
export const deleteStaff = async (req, res) => {
    try {
        const staffId = req.body.id;
        const staff = await Staff.findByIdAndDelete(staffId);
        if (!staff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }
        res.status(200).json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Staff Signup
export const staffSignup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingStaff = await Staff.findOne({ username });
        if (existingStaff) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const newStaff = await Staff.create({ username, password });
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Staff Login
export const staffLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const staff = await Staff.findOne({ username });
        if (!staff) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        if (staff.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Create and sign a JWT token
        const token = jwt.sign({ id: staff._id }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ token, staff });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
