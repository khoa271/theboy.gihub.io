const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items: { type: Object, default: {} }
});

module.exports = mongoose.model('Cart', CartSchema);
