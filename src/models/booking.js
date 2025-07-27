const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    roomId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    checkIn: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'Invalid check-in date'
        }
    },
    checkOut: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'Invalid check-out date'
        }
    },
    paymentDetails: {
        type: Object
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending','failed'],
        default: 'pending',
        required: true
    }
},{timestamps: true});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;