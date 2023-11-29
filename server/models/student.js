import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;