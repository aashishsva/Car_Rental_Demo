const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const VehicleOwnerSchema = new mongoose.Schema({
  emailid: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  mobileno: { type: String, required: true },
  dateofbirth: { type: Date },
  locationid:{ type: Types.ObjectId, ref :"LocationMaster" ,required: true },
  address: { type: String },
});
module.exports = mongoose.model("VehicalOwner", VehicleOwnerSchema);
