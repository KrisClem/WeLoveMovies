const router = require("express").Router({ mergeParams: true })
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router
  .route("/:reviewId")
  .get(controller.readAndAppend)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed)

module.exports = router