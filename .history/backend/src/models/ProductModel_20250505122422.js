const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    View: Number,
    bestseller: { type: Boolean, default: false }
    
}, { timestamps: true });  // Thêm timestamps để có createdAt

const Product = mongoose.model('products', productSchema);
module.exports = Product;
