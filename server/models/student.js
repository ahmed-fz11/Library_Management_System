import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    email: {
        type: String,
        required: true,
        unique: true, // Email should be unique for each student
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Simple regex for email validation
    },
    password: {
        type: String,
        required: true
        // You can add additional properties like minlength if needed
    }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;