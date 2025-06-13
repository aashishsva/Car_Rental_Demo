const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const ReviewSchema = new mongoose.Schema({
    carid: { type: mongoose.Schema.Types.ObjectId, ref:'PostCar', required: true },
    passengerid: { type: mongoose.Schema.Types.ObjectId, ref:'Passenger', required: true }, 
    reviewmessage: String,
    reviewrate: Number,
    postdate: Date
});

// Prevent OverwriteModelError
module.exports =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
