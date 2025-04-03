const Grocery = require('../models/Grocery');
const Order = require('../models/Order');

exports.getAllGroceries = async (req, res) => {
    const groceries = await Grocery.find();
    res.json(groceries);
};

exports.placeOrder = async (req, res) => {
    const { items } = req.body;
    let totalPrice = 0;

    for (let item of items) {
        const grocery = await Grocery.findById(item.grocery);
        if (!grocery || grocery.stock < item.quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }
        totalPrice += grocery.price * item.quantity;
        grocery.stock -= item.quantity;
        await grocery.save();
    }

    const order = new Order({ user: req.user.id, items, totalPrice });
    await order.save();

    res.json(order);
};
