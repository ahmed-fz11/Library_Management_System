import { Request, Response } from 'express';

// Mongoose Model
const Feedback = require('../models/feedback');

// Submit feedback
export const submitFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all feedbacks
export const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('student');
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get one feedback
export const getOneFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id).populate('student');
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a feedback
export const updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a feedback
export const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
