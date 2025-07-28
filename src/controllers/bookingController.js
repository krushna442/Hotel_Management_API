const Booking = require('../models/booking');
const User = require('../models/user');
const Room = require('../models/room');

exports.bookRoom = async (req, res) => {
    const { roomId, checkIn, checkOut } = req.body;
    const userId = req.userId;

    const now = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (
        isNaN(checkInDate.getTime()) ||
        isNaN(checkOutDate.getTime()) ||
        checkInDate < now.setHours(0,0,0,0) ||
        checkOutDate < now.setHours(0,0,0,0)
    ) {
        return res.status(400).json({ message: 'Check-in and check-out dates must be today or in the future' });
    }
    // Check at least 1 day gap
    const msInDay = 24 * 60 * 60 * 1000;
    if ((checkOutDate - checkInDate) < msInDay) {
        return res.status(400).json({ message: 'Check-out date must be at least 1 day after check-in date' });
    }

    try {
        const room = await Room.findById(roomId);
        if (!room || !room.isAvailable) {
            return res.status(400).json({ message: 'Room not available' });
        }

        const booking = new Booking({
            userId,
            roomId,
            checkIn,
            checkOut,
            status: 'confirmed'
        });

        await booking.save();

        // Mark the room as unavailable
        await Room.findByIdAndUpdate(roomId, { isAvailable: false });

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error booking room', error });
    }
};

exports.getMyBookings = async (req, res) => {
    const userId = req.userId;

    try {
        const bookings = await Booking.find({ userId });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error });
    }
};