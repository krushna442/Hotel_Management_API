const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    type: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive']
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
},{ timestamps: true });

module.exports = mongoose.model('Room', roomSchema);