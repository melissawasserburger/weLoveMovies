const router = require("express").Router({ mergeParam: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:reviewId").put(controller.update).delete(controller.delete).all(methodNotAllowed);

module.exports = router;