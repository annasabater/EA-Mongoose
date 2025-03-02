const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
});

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  date: {
    type: Date,
    default: new Date()
  },
  products: [productSchema],
});

module.exports = mongoose.model('User', userSchema);