const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('🛠 Đăng ký người dùng:', { name, email });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('❌ Email đã tồn tại:', email);
            return res.json({ success: false, message: 'Email đã tồn tại' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Kiểm tra JWT_SECRET
        if (!process.env.JWT_SECRET) {
            console.error('❌ Biến môi trường JWT_SECRET không được định nghĩa');
            return res.status(500).json({ success: false, message: 'Lỗi server: Thiếu cấu hình JWT_SECRET' });
        }

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('✅ Đã tạo token cho người dùng:', { userId: newUser._id, token });
        res.json({ success: true, token });
    } catch (error) {
        console.error('❌ Lỗi server khi đăng ký:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('🛠 Đăng nhập người dùng:', { email });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('❌ Không tìm thấy người dùng:', email);
            return res.json({ success: false, message: 'Sai email hoặc mật khẩu' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('❌ Mật khẩu không khớp:', email);
            return res.json({ success: false, message: 'Sai email hoặc mật khẩu' });
        }

        // Kiểm tra JWT_SECRET
        if (!process.env.JWT_SECRET) {
            console.error('❌ Biến môi trường JWT_SECRET không được định nghĩa');
            return res.status(500).json({ success: false, message: 'Lỗi server: Thiếu cấu hình JWT_SECRET' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('✅ Đã tạo token cho người dùng:', { userId: user._id, token });
        res.json({ success: true, token });
    } catch (error) {
        console.error('❌ Lỗi server khi đăng nhập:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    }
});

module.exports = router;