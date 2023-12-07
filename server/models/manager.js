import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

managerSchema.pre('save', async function (next) {
    const manager = this;
    if (!manager.isModified('password')) return next();

    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(manager.password, saltRounds);
        manager.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

//Method to compare passwords
managerSchema.methods.isPasswordValid = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const Manager = mongoose.model('Manager', managerSchema);

export default Manager;