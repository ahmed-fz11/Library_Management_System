import mongoose from 'mongoose';

const managerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    }
});

const Manager = mongoose.model('Manager', managerSchema);

export default Manager;