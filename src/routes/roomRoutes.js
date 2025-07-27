const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware'); // JWT auth middleware

// GET /rooms - List all available rooms (requires authentication)
router.get('/rooms', authMiddleware, roomController.getAllRooms);

// POST /rooms - Add a new room (admin only, requires authentication)
router.post('/rooms', authMiddleware, roomController.addRoom);

// PUT /rooms/:id - Update room information (admin only, requires authentication)
router.put('/rooms/:id', authMiddleware, roomController.updateRoom);

// DELETE /rooms/:id - Delete a room (admin only, requires authentication)
router.delete('/rooms/:id', authMiddleware, roomController.deleteRoom);

module.exports = router;