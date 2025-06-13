const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    model: String,
    year: String,
    price: String

})
module.exports = mongoose.model('Product', productSchema);