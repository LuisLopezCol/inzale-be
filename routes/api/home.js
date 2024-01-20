const HOME_CONTROLLER = require("../../controllers/home_controller");

module.exports = function (router) {
  router.get("/home", HOME_CONTROLLER.getAllMessages);
  router.post("/home", HOME_CONTROLLER.postMessage);
  router.put("/home/:id", HOME_CONTROLLER.likeMessage);
};
