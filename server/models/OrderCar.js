const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const OrderCarSchema = new Schema({
  _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
  carid: { type: Types.ObjectId, ref :"PostCar" ,required: true }, 
  ownerid: { type: Types.ObjectId, ref :"VehicalOwner", required: true }, 
  bookingdate: { type: Date, default: Date.now },
  sourcelocation: { type: String, required: true },
  destinationlocation: { type: String, required: true },
  pickuptime: { type: String, required: true },
  droptime: { type: String, required: true },
});

// Prevent OverwriteModelError
module.exports =
  mongoose.models.OrderCar || mongoose.model("OrderCar", OrderCarSchema);
