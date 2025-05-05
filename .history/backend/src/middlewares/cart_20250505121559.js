const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('🛠 Header nhận được:', authHeader);

    if (!authHeader) {
        console.log('❌ Không tìm thấy header Authorization');
        return res.status(401).json({ success: false, message: 'Không tìm thấy token!' });
    }

    if (!authHeader.startsWith('Bearer ')) {
        console.log('❌ Header Authorization không đúng định dạng');
        return res.status(401).json({ success: false, message: 'Header Authorization phải bắt đầu bằng Bearer!' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('❌ Token rỗng sau khi tách');
        return res.status(401).json({ success: false, message: 'Token không hợp lệ!' });
    }
    console.log('🛠 Token sau khi tách:', token);

    try {
        // Kiểm tra biến môi trường JWT_SECRET
        if (!process.env.JWT_SECRET) {
            console.error('❌ Biến môi trường JWT_SECRET không được định nghĩa');
            return res.status(500).json({ success: false, message: 'Lỗi server: Thiếu cấu hình JWT_SECRET' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('✅ Token hợp lệ:', decoded);
        next();
    } catch (error) {
        console.error('❌ Lỗi xác thực token:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token đã hết hạn!' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: `Token không hợp lệ: ${error.message}` });
        }
        return res.status(401).json({ success: false, message: 'Lỗi xác thực token!' });
    }
};