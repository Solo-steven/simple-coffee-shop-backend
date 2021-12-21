const  mongoose = require('mongoose');

const order = new mongoose.Schema({
    id: String,
    payWay: String,
    divierWay: String,
    email: String,
    list: [
        {
        name: String,
        number: [Number],
        category: [String],
        total: Number 
        }
    ],
    buyer: {
      name: String,
      phone: String,
      email: String,
    }, 
		reciver: {
      name: String,
      phone: String,
      email: String,
    }
});

module.exports = model("orders", order);
