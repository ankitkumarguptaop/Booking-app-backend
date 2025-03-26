const express = require("express");
const { eventController } = require("../controllers");
const router = express.Router();
const { imageUpload } = require("../middlewares");

router.get("/", eventController.listEvent);
router.post(
  "/",
  imageUpload.uplaod().single("image"),
  eventController.createEvent
);
router.delete(
  "/:id",
  eventController.deleteEvent
);
router.patch("/:id", eventController.updateEvent);

module.exports = router;
