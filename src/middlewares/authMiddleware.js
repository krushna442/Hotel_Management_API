const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    console.log('authMiddleware: token from cookie:', token);
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('authMiddleware: decoded token:', decoded);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log('authMiddleware: token verification failed:', err);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
