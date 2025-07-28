const Room = require('../models/room');
const User = require('../models/user');

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving rooms', error });
    }
};

exports.addRoom = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Not allowed' });
        }
        const { number, type, price } = req.body;
        const newRoom = new Room({ number, type, price, isAvailable: true });
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(500).json({ message: 'Error adding room', error });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const userId = req.cookies.userId;
        const user = await User.findById(userId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Not allowed' });
        }
        const { id } = req.params;
        const updates = req.body;
        const updatedRoom = await Room.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(500).json({ message: 'Error updating room', error });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const userId = req.cookies.userId;
        const user = await User.findById(userId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Not allowed' });
        }
        const { id } = req.params;
        await Room.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting room', error });
    }
};