const { OK } = require("../libs/constants");
const { seatService } = require("../services");

exports.allocateSeats = async (req, res, next) => {
  try {
    const response = await seatService.allocateSeats({
      body: req.body,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly  Created ", allocatedSeats: response });
  } catch (error) {
    console.log("Failed to create Event", error.message);
    return next(error);
  }
};

exports.countAllocatedSeats = async (req, res, next) => {
  try {
    const response = await seatService.countAllocatedSeats({
      body: req.body,
      user: req.user,
      params :req.params
    });
    res
      .status(OK)
      .json({ message: "Count of allocated seats ", count: response });
  } catch (error) {
    console.log("Failed to dislay Count of allocated seats", error.message);
    return next(error);
  }
};
