const mongoose = require('mongoose');

const order = new mongoose.Schema({
  payWay: String,
  deliverWay: String,
  list: [
    {
      name: String,
      number: Number,
      specification: String,
    },
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
  },
});

module.exports = mongoose.model('orders', order);
