const Grocery = require('../models/Grocery');

exports.addGrocery = async (req, res) => {
    const grocery = new Grocery(req.body);
    await grocery.save();
    res.json(grocery);
};

exports.updateGrocery = async (req, res) => {
    const grocery = await Grocery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(grocery);
};

exports.deleteGrocery = async (req, res) => {
    await Grocery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Grocery deleted' });
};

exports.getAllGroceries = async (req, res) => {
    const groceries = await Grocery.find();
    res.json(groceries);
};
