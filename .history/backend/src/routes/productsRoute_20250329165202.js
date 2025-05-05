const express = require('express');
const ProductModel = require('../models/ProductModel');

const router = express.Router();

// API: Lấy tất cả sản phẩm
router.get('/list', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Lỗi lấy danh sách sản phẩm' });
    }
});

// API: Lấy 4 sản phẩm mới nhất
router.get('/latest', async (req, res) => {
    try {
        const latestProducts = await ProductModel.find().sort({ createdAt: -1 }).limit(4);
        res.json({ success: true, products: latestProducts });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Lỗi lấy sản phẩm mới nhất' });
    }
});

// API: Lấy 4 sản phẩm bán chạy (lọc theo lượt xem)
router.get('/best', async (req, res) => {
    try {
        const bestSellers = await ProductModel.find().sort({ views: -1 }).limit(4);
        res.json({ success: true, products: bestSellers });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Lỗi lấy sản phẩm bán chạy' });
    }
});

// API: Xem chi tiết sản phẩm
router.get('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại!' });

        // ✅ Cập nhật lượt xem sản phẩm
        product.views = (product.views || 0) + 1;
        await product.save();

        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi server!' });
    }
});

module.exports = router;
