const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    bookingId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be positive']
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);