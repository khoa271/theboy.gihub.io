require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cartRoute = require('./routes/cartRoute.js');
const productRoutes = require('./routes/productsRoute.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const userRoutes = require('./routes/userRoute.js');

const app = express();
const port = 3001;

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware xử lý JSON
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/DATN', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Kết nối thành công với MongoDB'))
.catch(err => console.error('❌ Lỗi kết nối MongoDB:', err.message));

// Phục vụ file tĩnh
app.use('/img', express.static('img'));

// Định tuyến
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoute);
app.use('/api/payments', paymentRoutes);
app.use('/api/user', userRoutes);

// Khởi động server
app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
    console.log(`✅ Biến môi trường JWT_SECRET: ${process.env.JWT_SECRET || 'chưa được định nghĩa'}`);
});