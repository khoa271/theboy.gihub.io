const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel.js');
const Product = require('../models/ProductModel.js'); // ✅ Import model sản phẩm
const verifyToken = require('../middlewares/cart.js');

// ✅ Lấy giỏ hàng của người dùng
router.get('/get', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }) || { items: {} };
        res.json({ success: true, cart: cart.items });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

// ✅ Lấy tổng số lượng sản phẩm trong giỏ
router.get('/count', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.json({ success: true, count: 0 });

        const count = Object.values(cart.items).reduce((total, sizes) => 
            total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0), 0
        );

        res.json({ success: true, count });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

// ✅ Cập nhật giỏ hàng
router.post('/update', verifyToken, async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.user.id;

        // Kiểm tra sản phẩm có tồn tại không
        const product = await Product.findById(itemId);
        if (!product) {
            return res.status(400).json({ success: false, message: 'Sản phẩm không tồn tại' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) cart = new Cart({ userId, items: {} });

        if (quantity > 0) {
            cart.items[itemId] = cart.items[itemId] || {};
            cart.items[itemId][size] = quantity;
        } else {
            delete cart.items[itemId]?.[size];
            if (Object.keys(cart.items[itemId] || {}).length === 0) {
                delete cart.items[itemId];
            }
        }

        await cart.save();
        res.json({ success: true, cart: cart.items });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

// ✅ Xóa giỏ hàng
router.delete('/clear', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        await Cart.updateOne({ userId }, { $set: { items: {} } }); // ✅ Xóa nhanh hơn
        res.json({ success: true, message: 'Đã xóa giỏ hàng' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

// ✅ Tính tổng tiền giỏ hàng
router.get('/total', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.json({ success: true, total: 0 });

        let total = 0;
        for (const itemId in cart.items) {
            const product = await Product.findById(itemId);
            if (product) {
                for (const size in cart.items[itemId]) {
                    total += product.price * cart.items[itemId][size];
                }
            }
        }

        res.json({ success: true, total });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

module.exports = router;
