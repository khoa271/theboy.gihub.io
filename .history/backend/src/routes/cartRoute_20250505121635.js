const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel.js');
const Product = require('../models/ProductModel.js');
const verifyToken = require('../middlewares/cart.js');

// Lấy giỏ hàng của người dùng
router.get('/get', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('🛠 Lấy giỏ hàng cho userId:', userId);
        const cart = await Cart.findOne({ userId }) || { items: {} };
        res.json({ success: true, cart: cart.items });
    } catch (error) {
        console.error('❌ Lỗi khi lấy giỏ hàng:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    }
});

// Lấy tổng số lượng sản phẩm trong giỏ
router.get('/count', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('🛠 Tính tổng số lượng sản phẩm cho userId:', userId);
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            console.log('✅ Giỏ hàng rỗng');
            return res.json({ success: true, count: 0 });
        }

        const count = Object.values(cart.items).reduce((total, sizes) => 
            total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0), 0
        );

        console.log('✅ Tổng số lượng:', count);
        res.json({ success: true, count });
    } catch (error) {
        console.error('❌ Lỗi khi tính tổng số lượng:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    }
});

// Cập nhật giỏ hàng
router.post('/update', verifyToken, async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.user.id;
        console.log('🛠 Cập nhật giỏ hàng:', { userId, itemId, size, quantity });

        // Kiểm tra sản phẩm có tồn tại không
        const product = await Product.findById(itemId);
        if (!product) {
            console.log('❌ Sản phẩm không tồn tại:', itemId);
            return res.status(400).json({ success: false, message: 'Sản phẩm không tồn tại' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            console.log('🛠 Tạo giỏ hàng mới cho userId:', userId);
            cart = new Cart({ userId, items: {} });
        }

        if (quantity > 0) {
            cart.items[itemId] = cart.items[itemId] || {};
            cart.items[itemId][size] = quantity;
        } else {
            if (cart.items[itemId]?.[size]) {
                delete cart.items[itemId][size];
                if (Object.keys(cart.items[itemId]).length === 0) {
                    delete cart.items[itemId];
                }
            }
        }

        await cart.save();
        console.log('✅ Đã cập nhật giỏ hàng:', cart.items);
        res.json({ success: true, cart: cart.items });
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật giỏ hàng:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    }
});

// Xóa giỏ hàng
router.delete('/clear', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('🛠 Xóa giỏ hàng cho userId:', userId);
        await Cart.updateOne({ userId }, { $set: { items: {} } });
        console.log('✅ Đã xóa giỏ hàng');
        res.json({ success: true, message: 'Đã xóa giỏ hàng' });
    } catch (error) {
        console.error('❌ Lỗi khi xóa giỏ hàng:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    }
});

// Tính tổng tiền giỏ hàng
router.get('/total', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('🛠 Tính tổng tiền giỏ hàng cho userId:', userId);
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            console.log('✅ Giỏ hàng rỗng');
            return res.json({ success: true, total: 0 });
        }

        let total = 0;
        for (const itemId in cart.items) {
            const product = await Product.findById(itemId);
            if (product) {
                for (const size in cart.items[itemId]) {
                    total += product.price * cart.items[itemId][size];
                }
            }
        }

        console.log('✅ Tổng tiền:', total);
        res.json({ success: true, total });
    } catch (error) {
        console.error('❌ Lỗi khi tính tổng tiền:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    }
});

module.exports = router;