const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('🛠 Header nhận được:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    console.log('🛠 Token sau khi tách:', token);

    try {
        const decoded = jwt.verify(token, 'secret_key'); // ✅ Đảm bảo key đúng
        req.user = decoded;
        console.log('✅ Token hợp lệ:', decoded);
        next();
    } catch (error) {
        console.log('❌ Token lỗi:', error.message);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
