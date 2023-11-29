import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    location: { type: String, required: true, enum: ['IT Services', 'Children Section', 'History Section'] },
    performance: { type: Number, required: true, min: 1, max: 5 },
    salary: { type: mongoose.Decimal128, required: true }
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;