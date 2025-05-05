const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên sản phẩm
    price: { type: Number, required: true }, // Giá sản phẩm
    image: { type: String }, // URL hình ảnh sản phẩm
    description: { type: String }, // Mô tả sản phẩm
    bestseller: { type: Boolean, default: false }, // Đánh dấu sản phẩm bán chạy
    views: { type: Number, default: 0 } // Số lượt xem sản phẩm
}, {
    timestamps: true,
    collection: 'product' // Rõ ràng chỉ định tên bộ sưu tập
});

module.exports = mongoose.model('Product', productSchema); // Đảm bảo không có khoảng trắng thừa