const express = require("express");
const { seatController } = require("../controllers");
const router = express.Router();

router.get("/:eventId", seatController.countAllocatedSeats);
router.post("/", seatController.allocateSeats);

module.exports = router;
