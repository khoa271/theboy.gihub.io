const express = require('express');
const ProductModel = require('../models/ProductModel');

const router = express.Router();

// API: Lấy tất cả sản phẩm
router.get('/list', async (req, res) => {
    try {
        console.log('🛠 Gửi yêu cầu lấy danh sách sản phẩm');
        const products = await ProductModel.find();
        console.log('✅ Trả về', products.length, 'sản phẩm');
        res.json({ success: true, products });
    } catch (err) {
        console.error('❌ Lỗi lấy danh sách sản phẩm:', err.message);
        res.status(500).json({ success: false, message: 'Lỗi lấy danh sách sản phẩm: ' + err.message });
    }
});

// API: Lấy 4 sản phẩm mới nhất
router.get('/latest', async (req, res) => {
    try {
        console.log('🛠 Gửi yêu cầu lấy sản phẩm mới nhất');
        const latestProducts = await ProductModel.find().sort({ createdAt: -1 }).limit(4);
        console.log('✅ Trả về', latestProducts.length, 'sản phẩm mới nhất');
        res.json({ success: true, products: latestProducts });
    } catch (err) {
        console.error('❌ Lỗi lấy sản phẩm mới nhất:', err.message);
        res.status(500).json({ success: false, message: 'Lỗi lấy sản phẩm mới nhất: ' + err.message });
    }
});

// API: Lấy 4 sản phẩm bán chạy
router.get('/best', async (req, res) => {
    try {
        console.log('🛠 Gửi yêu cầu lấy sản phẩm bán chạy');
        const bestSellers = await ProductModel.find({ bestseller: true }).limit(4);
        console.log('✅ Trả về', bestSellers.length, 'sản phẩm bán chạy');
        res.json({ success: true, products: bestSellers });
    } catch (err) {
        console.error('❌ Lỗi lấy sản phẩm bán chạy:', err.message);
        res.status(500).json({ success: false, message: 'Lỗi lấy sản phẩm bán chạy: ' + err.message });
    }
});

// API: Xem chi tiết sản phẩm
router.get('/:id', async (req, res) => {
    try {
        console.log('🛠 Gửi yêu cầu lấy chi tiết sản phẩm:', req.params.id);
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            console.log('❌ Sản phẩm không tồn tại:', req.params.id);
            return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại!' });
        }

        // Cập nhật lượt xem sản phẩm
        product.views = (product.views || 0) + 1;
        await product.save();
        console.log('✅ Cập nhật lượt xem sản phẩm:', product.views);

        res.json({ success: true, product });
    } catch (err) {
        console.error('❌ Lỗi lấy chi tiết sản phẩm:', err.message);
        res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
    }
});

module.exports = router;