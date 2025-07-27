const simulatePayment = (cardInfo) => {
    // Simulate payment processing
    const { cardNumber, expiryDate, cvv } = cardInfo;

    // Basic validation (for simulation purposes)
    if (!cardNumber || !expiryDate || !cvv) {
        return { success: false, message: 'Invalid card information' };
    }

    // Simulate a successful payment response
    return { success: true, message: 'Payment processed successfully' };
};

module.exports = {
    simulatePayment,
};