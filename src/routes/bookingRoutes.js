const express = require('express');
const { bookRoom, getMyBookings } = require('../controllers/bookingController');
const router = express.Router();

// Route for booking a room
router.post('/book', bookRoom);

// Route for getting user's bookings
router.get('/my-bookings', getMyBookings);

module.exports = router;