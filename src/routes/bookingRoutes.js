const express = require('express');
const { bookRoom, getMyBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/book', bookRoom);

router.get('/my-bookings', getMyBookings);

module.exports = router;