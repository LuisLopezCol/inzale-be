const AuthController = require("../../controllers/auth_controller");

module.exports = function (router) {
  router.put("/user/:id", AuthController.updateById);
  router.post("/user", AuthController.createUser);
  router.post("/user/login", AuthController.login);
};
