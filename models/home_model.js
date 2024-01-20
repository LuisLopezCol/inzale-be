const mongoose = require("mongoose");

// Schema
const HomeSchema = mongoose.Schema({
  title: { type: String, require: true },
  message: { type: String, require: true },
  image: { type: String, require: true },
  likes: { type: [mongoose.Schema.Types.ObjectId], require: true, default: [] },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  createdAt: { type: Date, required: false, default: Date.now() },
});

HomeSchema.statics = {
  /**
   * Retrieves all messages for a given ID using a callback function.
   *
   * @param {type} id - description of parameter
   * @param {type} callback - description of parameter
   * @return {type} populated user model
   */
  getAllMessages: function (id, callback) {
    return this.find().populate({
      path: "user",
      model: "User",
    });
  },

  /**
   * Asynchronously posts a message.
   *
   * @param {object} req - the request object
   * @param {object} res - the response object
   * @return {object} an object indicating the success of the operation
   */
  postMessage: async function (req, res) {
    try {
      const post = new this(req);
      await post.save();

      return { success: true };
    } catch (error) {
      let code = 400;
      let message = "Error";
      if (error instanceof RouteError) {
        code = error.code;
        message = error.message;
      }
      return res
        .status(code)
        .json({ statusCode: code, success: false, msg: message });
    }
  },

  /**
   * An asynchronous function to update a message based on its ID.
   *
   * @param {type} id - The ID of the message to be updated
   * @param {type} updateData - The data to update the message with
   * @param {type} res - The response object for sending the result
   * @return {type} An object indicating the success of the update
   */
  likeMessage: async function (id, updateData, res) {
    try {
      this.findOneAndUpdate(
        { _id: id },
        { $set: { ["likes"]: updateData } },
        { new: true },
        (error, updatedDocument) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Updated document:", updatedDocument);
          }
        }
      );

      return { success: true };
    } catch (error) {
      console.log(error);
      let code = 400;
      let message = "Error";
      if (error instanceof RouteError) {
        code = error.code;
        message = error.message;
      }
      return res
        .status(code)
        .json({ statusCode: code, success: false, msg: message });
    }
  },
};

const Home = (module.exports = mongoose.model("Home", HomeSchema));
