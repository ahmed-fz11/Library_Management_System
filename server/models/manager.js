import mongoose from 'mongoose';

const managerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] }
});

const Manager = mongoose.model('Manager', managerSchema);

export default Manager;