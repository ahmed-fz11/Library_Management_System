import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
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

//Middleware to hash the password before saving to the database
studentSchema.pre('save', async function (next) {
    const student = this;
    if (!student.isModified('password')) return next();

    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(student.password, saltRounds);
        student.password = hashedPassword;
        next();
    } catch (error) {
        console.log("Error hashing password")
        return next(error);
    }
});

//Method to compare passwords
studentSchema.methods.isPasswordValid = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};


const Student = mongoose.model('Student', studentSchema);

export default Student;