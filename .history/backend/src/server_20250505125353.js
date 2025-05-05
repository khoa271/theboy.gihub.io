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
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware xử lý JSON
app.use(express.json());

// Kết nối MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/DATN';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Kết nối thành công với MongoDB tại:', mongoUri))
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
    console.log(`✅ Biến môi trường MONGODB_URI: ${process.env.MONGODB_URI || 'chưa được định nghĩa'}`);
    console.log(`✅ Các origin được phép: ${allowedOrigins.join(', ')}`);
});