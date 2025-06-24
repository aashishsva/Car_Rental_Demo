const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostCar',
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  dropDate: {
    type: Date,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropLocation: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'Card', 'COD'],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Confirmed'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
