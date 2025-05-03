require('dotenv').config({ path: './src/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cartRoute = require('./routes/cartRoute.js'); 
const productRoutes = require('./routes/productsRoute.js');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoute.js');
const app = express();
const port = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/DATN', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

app.use('/img', express.static('img'));
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoute);
app.use('/api/payments', paymentRoutes);

app.use('/api/user', userRoutes);
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
