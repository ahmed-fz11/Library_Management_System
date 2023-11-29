import { Request, Response } from 'express';

// Mongoose Model
const Manager = require('../models/manager');

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
        const manager = await Manager.findById(req.params.id);
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
        const manager = await Manager.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const manager = await Manager.findByIdAndDelete(req.params.id);
        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
