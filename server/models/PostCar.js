const mongoose = require("mongoose");
const {Schema, Types} = mongoose;

const PostCarSchema = new mongoose.Schema({
  _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
  catid: { type: Types.ObjectId,ref:"CategoryMaster", required: true },
  vehicleownerid: { type: Types.ObjectId, ref:"VehicleOwner", required: true },
  cartitle: { type: String, required: true },
  shortdescription: { type: String },
  carimage1: { type: String },
  carimage2: { type: String },
  rcimage: { type: String }, 
  rcnumber: { type: String }, 
  postdate: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  variant: { type: String },
  driverstatus: { type: String },
  registrationyear: { type: Number },
  carvehicleno: { type: String },
});
module.exports = mongoose.model("PostCar", PostCarSchema);
