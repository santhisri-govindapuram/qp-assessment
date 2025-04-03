const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
});

module.exports = mongoose.model('Grocery', GrocerySchema);
