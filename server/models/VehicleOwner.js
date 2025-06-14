const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const VehicleOwnerSchema = new Schema({
  emailid: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  mobileno: { type: String, required: true },
  dateofbirth: { type: Date },
  address: { type: String },
  locationid: { type: Types.ObjectId, ref: "LocationMaster", required: true },

  // ✅ Correct reference to UserRegistration model
  userid: { type: Types.ObjectId, ref: "UserRegistration", required: true },

  postcars: [{ type: Types.ObjectId, ref: "PostCar" }]
});

// module.exports = mongoose.model("VehicleOwner", VehicleOwnerSchema);
module.exports = mongoose.model("VehicleOwner", VehicleOwnerSchema, "vehicalowners");
