const { OK } = require("../libs/constants");
const { eventService } = require("../services");

exports.createEvent = async (req, res, next) => {
  try {
    const response = await eventService.createEvent({
      body: req.body,
      file: req.file,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly Event Created ", event: response });
  } catch (error) {
    console.log("Failed to create Event", error.message);
    return next(error);
  }
};

exports.listEvent = async (req, res, next) => {
  try {
    const response = await eventService.listEvent({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    res.status(OK).json({ message: "successfuly list Event", event: response });
  } catch (error) {
    console.log("Failed to list Event", error.message);
    return next(error);
  }
};

exports.listAdminEvent = async (req, res, next) => {
  try {
    const response = await eventService.listAdminEvent({
      body: req.body,
      query: req.query,
      params: req.params,
      user: req.user,
    });
    res.status(OK).json({ message: "successfuly list Event", event: response });
  } catch (error) {
    console.log("Failed to list Event", error.message);
    return next(error);
  }
};

exports.listAllEvent = async (req, res, next) => {
  try {
    const response = await eventService.listAllEvent({
      body: req.body,
      query: req.query,
      params: req.params,
      user: req.user,
    });
    res.status(OK).json({ message: "successfuly list Event", event: response });
  } catch (error) {
    console.log("Failed to list Event", error.message);
    return next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const response = await eventService.updateEvent({
      body: req.body,
      query: req.query,
      params: req.params,
      file: req.file,
    });
    res.status(OK).json({ message: "successfuly list Event", event: response });
  } catch (error) {
    console.log("Failed to Update Event", error.message);
    return next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const response = await eventService.deleteEvent({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    res.status(OK).json({ message: "successfuly list Event", event: response });
  } catch (error) {
    console.log("Failed to delete Event", error.message);
    return next(error);
  }
};
