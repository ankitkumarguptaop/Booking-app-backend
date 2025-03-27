const { Sequelize } = require("sequelize");
const { eventRepository } = require("../repositories");
const { BadRequest } = require("../libs/errors");

exports.createEvent = async (payload) => {
  const { name, details, seats, timing, ticketPrice } = payload.body;
  const { id } = payload.user;
  const path = payload?.file?.path || null;
  const response = await eventRepository.create({
    name: name,
    details: details,
    image: path,
    seats: seats,
    timing: timing,
    creater_id: id,
    ticket_price: ticketPrice,
  });

  return response;
};

exports.deleteEvent = async (payload) => {
  const { name, details, seats, timing } = payload.body;
  const path = payload?.file?.path || null;
  const response = await eventRepository.create({
    name: name,
    details: details,
    image: path,
    seats: seats,
    timing: timing,
  });
  return response;
};

exports.listEvent = async (payload) => {
  const { page = 1, limit = 5, search } = payload.query;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }
  let whereObj = { status: "approved" };
  if (search) {
    whereObj[Sequelize.Op.or] = [
      { name: { [Sequelize.Op.iLike]: `%${search}%` } },
    ];
  }
  const response = await eventRepository.findAndCountAll({
    criteria: whereObj,
    include: ["user"],
    offset: offset,
    limit: limit,
  });

  return response;
};

exports.listAdminEvent = async (payload) => {
  const { page = 1, limit = 5, search } = payload.query;
  const { id } = payload.user;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }
  let whereObj = { creater_id: id };
  if (search) {
    whereObj[Sequelize.Op.or] = [
      { name: { [Sequelize.Op.iLike]: `%${search}%` } },
    ];
  }
  const response = await eventRepository.findAndCountAll({
    criteria: whereObj,
    include: ["user"],
    offset: offset,
    limit: limit,
  });

  return response;
};

exports.listPendingEvent = async (payload) => {
  const { page = 1, limit = 5, search } = payload.query;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }
  let whereObj = { status: "pending" };
  if (search) {
    whereObj[Sequelize.Op.or] = [
      { name: { [Sequelize.Op.iLike]: `%${search}%` } },
    ];
  }
  const response = await eventRepository.findAndCountAll({
    criteria: whereObj,
    include: ["user"],
    offset: offset,
    limit: limit,
  });

  return response;
};

exports.updateEvent = async (payload) => {
  const { id } = payload.params;
  console.log("✌️payload.params --->", payload.params);
  console.log("✌️id --->", id);

  if (!id) {
    throw BadRequest("event id not given");
  }

  const response = await eventRepository.update({
    payload: payload.body,
    criteria: { id: parseInt(id) },
  });
  return response;
};
