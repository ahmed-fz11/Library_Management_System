import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    aspect: { type: String, required: true, enum: ['Availability of books', 'Diversity of collections', 'Cleanliness of library'] },
    score: { type: Number, required: true, min: 1, max: 5 }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;