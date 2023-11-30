// import { Request, Response } from 'express';
import express from 'express';
// Mongoose Model
import Manager from '../models/manager.js';

// Add a new manager
export const addManager = async (req, res) => {
    try {
        const manager = await Manager.create(req.body);
        res.status(201).json(manager);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all managers
export const getAllManagers = async (req, res) => {
    try {
        const managers = await Manager.find();
        res.status(200).json(managers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get one manager
export const getOneManager = async (req, res) => {
    try {
        const managerId = req.body.id;
        const manager = await Manager.findById(managerId);
        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.status(200).json(manager);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a manager
export const updateManager = async (req, res) => {
    try {
        const managerId = req.body.id;
        const manager = await Manager.findByIdAndUpdate(managerId, req.body, { new: true });
        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.status(200).json(manager);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a manager
export const deleteManager = async (req, res) => {
    try {
        const managerId = req.body.id;
        const manager = await Manager.findByIdAndDelete(managerId);
        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Manager Signup
export const managerSignup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingManager = await Manager.findOne({ email });
        if (existingManager) {
            return res.status(400).json({ error: 'email already exists' });
        }
        const newManager = await Manager.create(req.body);
        res.status(201).json(newManager);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Manager Login
export const managerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const manager = await Manager.findOne({ email });
        if (!manager) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        if (manager.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json(manager);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};