const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String, // Tên sản phẩm
    price: Number, // Giá sản phẩm
    image: String, // URL hình ảnh sản phẩm
    description: String, // Mô tả sản phẩm
    bestseller: { type: Boolean, default: false }, // Đánh dấu sản phẩm bán chạy
    views: { type: Number, default: 0 } // Số lượt xem sản phẩm
}, { timestamps: true,
    collection: 'product'
 }); 

const Product = mongoose.model('product', productSchema);
module.exports = Product;