import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    location: { type: String, required: true, enum: ['IT Services', 'Children Section', 'History Section'] },
    performance: { type: Number, required: true, min: 1, max: 5 },
    salary: { type: mongoose.Decimal128, required: true },
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

staffSchema.pre('save', async function (next) {
    const staff = this;
    if (!staff.isModified('password')) return next();

    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(staff.password, saltRounds);
        staff.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

//Method to compare passwords
staffSchema.methods.isPasswordValid = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;