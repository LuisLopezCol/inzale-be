const mongoose = require("mongoose");
let ObjectId = require("mongoose").Types.ObjectId;
// const UTIL_OBJECT = require("../utils/agregate_querys");

// Schema
const UserSchema = mongoose.Schema({
  profilePicture: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive", "blocked"],
    default: "active",
  },
  type: {
    type: String,
    required: true,
    enum: ["regular"],
    default: "regular",
  },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  country: { type: Object, required: true },
  slogan: { type: String, required: true },
  sports: { type: [Object], required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

  deleted: { type: Date, require: false, default: null },
  createdAt: { type: Date, required: false, default: Date.now() },
  lastUpdated: { type: Date, require: false, default: Date.now() },
});

UserSchema.statics = {
  /**
   * Updates a document by its ID.
   *
   * @param {Object} req - request object containing parameters and body
   * @param {Function} callback - callback function
   * @return {Object} the updated document
   */
  updateById: function (req, callback) {
    this.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
      callback
    );
  },
};
module.exports = mongoose.model("User", UserSchema);
