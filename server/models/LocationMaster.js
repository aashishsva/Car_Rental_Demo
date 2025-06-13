const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const LocationMasterSchema = new Schema({
  // _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
  locationname: { type: String, required: true }
});

module.exports = mongoose.models.LocationMaster || mongoose.model('LocationMaster', LocationMasterSchema);
