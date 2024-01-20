const UserModel = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const infoValidator = require("../utils/info_validator");
const jwt = require("jsonwebtoken");
const configDataBase = require("../config/database");

/**
 * Create a category
 * All require properties in the model
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {
  try {
    const body = req.body;
    delete body._id;
    if (
      !infoValidator.onCheckPassword(body.password) ||
      !infoValidator.validateEmail(body.email)
    ) {
      throw new Error(
        "Email or password not formatted correctly or doesnt not exist"
      );
    }

    // check is user exist
    let checkExistingUser = await UserModel.findOne({ email: body.email });
    if (checkExistingUser) throw new Error("User already exist");

    const hash = await bcryptjs.hash(body.password, 10);
    body.password = hash;

    const userToCreate = new UserModel(body);
    await userToCreate.save();

    if (!userToCreate)
      throw new Error("Something went wrong creating the user, try again");

    const tokenUser = {
      _id: userToCreate._id,
      name: userToCreate.name,
      last_name: userToCreate.surname,
      email: userToCreate.email,
    };

    // Register successfully, login.
    const token = jwt.sign({ tokenUser }, configDataBase.jwtKey, {
      expiresIn: 604800,
    });

    // Add token to response
    userToCreate.token = token;

    // Make sure secret data is not shared back to the client
    userToCreate.passwordConfirm = null;
    userToCreate.password = null;
    userToCreate.deleted = null;
    userToCreate.createdAt = null;
    userToCreate.lastUpdated = null;

    // Response
    res.status(200).json({
      success: true,
      data: userToCreate,
      token,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating a user", error);
    res.status(400).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

/**
 * Login a user
 * @param {*} req | email, password
 * @param {*} res | token and basic info information
 */
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) throw new Error("Email or password is missing");

    email = email.toLowerCase();
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User doesnt exist.");

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) throw new Error("Given password is incorrect");

    const tokenUser = {
      _id: user._id,
      name: user.name,
      last_name: user.surname,
      email: user.email,
    };

    // Register successfully, login.
    const token = jwt.sign({ tokenUser }, configDataBase.jwtKey, {
      expiresIn: 604800,
    });
    console.log("token", token);
    // Add token to response
    user.token = token;

    // Make sure secret data is not shared back to the client
    user.passwordConfirm = null;
    user.password = null;
    user.deleted = null;
    user.createdAt = null;
    user.lastUpdated = null;

    // Response
    res.status(200).json({
      success: true,
      data: user,
      token,
      message: "User successfully logged",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

/**
 * Asynchronously updates a user by ID.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} a Promise that resolves to the updated user data
 */
const updateById = async (req, res) => {
  UserModel.updateById(req, function (err, result) {
    if (!err) {
      res.status(201).json({
        success: true,
        message: "User updated",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error when updating the user",
        data: err,
      });
    }
  });
};

module.exports = {
  createUser,
  login,
  updateById,
};
