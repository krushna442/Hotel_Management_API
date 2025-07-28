const Payment = require('../models/payment');
const Booking = require('../models/booking');
const Room = require('../models/room');
const { simulatePayment } = require('../utils/paymentSimulator');

exports.simulatePayment = async (req, res) => {
    const { cardNumber, expiryDate, cvv, amount ,bookingId } = req.body;

    const paymentResult = simulatePayment({cardNumber, expiryDate, cvv, amount});

    if (paymentResult.success) {
        const payment = new Payment({
            userId: req.userId, 
            bookingId: bookingId,
            amount: amount,
            status: 'completed'
        });

        await payment.save();

        // Update paymentDetails in the booking document
        await Booking.findByIdAndUpdate(
            bookingId,
            { paymentDetails: payment },
            { new: true }
        );

        return res.status(200).json({ message: 'Payment successful', payment });
    } else {
        // On payment failure, update booking status to 'failed' and set room isAvailable to true
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: 'failed' },
            { new: true }
        );
        if (booking && booking.roomId) {
            await Room.findByIdAndUpdate(booking.roomId, { isAvailable: true });
        }
        return res.status(400).json({ message: 'Payment failed', error: paymentResult.message });
    }
};