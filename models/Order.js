const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        grocery: { type: mongoose.Schema.Types.ObjectId, ref: 'Grocery' },
        quantity: Number
    }],
    totalPrice: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
