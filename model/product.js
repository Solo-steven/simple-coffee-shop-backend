const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name: String,
    category: String,
    imgUrl: String,
    price: [Number],
    specification: [String],
    payway: [String],
    deliverWay: [String],
    description: String 
});

module.exports = mongoose.model("products",product);
