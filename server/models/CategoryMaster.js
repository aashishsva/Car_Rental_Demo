const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const CategoryMasterSchema = new Schema({
  _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
  catname: { type: String, required: true }
});

// Prevent OverwriteModelError
module.exports = mongoose.models.CategoryMaster || mongoose.model('CategoryMaster', CategoryMasterSchema);
