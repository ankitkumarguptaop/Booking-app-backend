const express = require("express");
const { eventController } = require("../controllers");
const router = express.Router();
const { imageUpload } = require("../middlewares");

router.get("/approved", eventController.listEvent);
router.get("/admins", eventController.listAdminEvent);
router.get("/", eventController.listAllEvent);
router.post(
  "/",
  imageUpload.uplaod().single("image"),
  eventController.createEvent
);
router.delete("/:id", eventController.deleteEvent);
router.patch("/:id", imageUpload.uplaod().single("image"), eventController.updateEvent);

module.exports = router;
