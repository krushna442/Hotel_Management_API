const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const roomRoutes = require('./roomRoutes');
const bookingRoutes = require('./bookingRoutes');
const paymentRoutes = require('./paymentRoutes');
const authMiddleware = require('../middlewares/authMiddleware'); // JWT auth middleware
router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', authMiddleware, bookingRoutes);
router.use('/payments', authMiddleware, paymentRoutes);

module.exports = router;
