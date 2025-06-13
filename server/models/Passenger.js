const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema({
  emailid: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  mobileno: { type: String, required: true },
  dateofbirth: { type: Date },
  locationid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LocationMaster",
    required: true,
  },
  address: { type: String },
});

module.exports = mongoose.model("Passenger", PassengerSchema);
