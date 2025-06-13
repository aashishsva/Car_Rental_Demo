const product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
}

exports.createProduct = async (req, res) => {
    const { name, model, year, price } = req.body;

    try {
        const newProduct = new product({ name, model, year, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
}