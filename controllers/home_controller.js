const { RouteError } = require("../errors/errors");
const HOME_MODEL = require("../models/home_model");

/**
 * Function to handle retrieving all messages.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Object} the JSON response with success status, message, and data
 */
exports.getAllMessages = async function (req, res) {
  try {
    let result = await HOME_MODEL.getAllMessages();
    return res.json({
      success: true,
      message: "Messages found",
      data: result,
    });
  } catch (error) {
    let code = 400;
    let message = "Not found messages for this query";
    if (error instanceof RouteError) {
      code = error.code;
      message = error.message;
    }
    return res
      .status(code)
      .json({ statusCode: code, success: false, msg: message });
  }
};

/**
 * Asynchronously posts a message using the provided request and response objects.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Object} the JSON response with success, message, and data fields
 */
exports.postMessage = async function (req, res) {
  console.log("req.body", req.body);
  try {
    let result = await HOME_MODEL.postMessage(req.body);
    return res.json({
      success: true,
      message: "Message posted",
      data: result,
    });
  } catch (error) {
    let code = 400;
    let message = "No posted message for this query";
    if (error instanceof RouteError) {
      code = error.code;
      message = error.message;
    }
    return res
      .status(code)
      .json({ statusCode: code, success: false, msg: message });
  }
};

exports.likeMessage = async function (req, res) {
  try {
    let result = await HOME_MODEL.likeMessage(req.params.id, req.body);
    return res.json({
      success: true,
      message: "Message posted",
      data: result,
    });
  } catch (error) {
    let code = 400;
    let message = "No posted message for this query";
    if (error instanceof RouteError) {
      code = error.code;
      message = error.message;
    }
    return res
      .status(code)
      .json({ statusCode: code, success: false, msg: message });
  }
};
