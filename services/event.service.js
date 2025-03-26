const { Sequelize } = require("sequelize");
const { eventRepository } = require("../repositories");

exports.createEvent = async (payload) => {
  const { name, details, seats, timing, creater_id } = payload.body;
  const path = payload?.file?.path || null;
  const response = await eventRepository.create({
    name: name,
    details: details,
    image: path,
    seats: seats,
    timing: timing,
    creater_id: creater_id,
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
  let whereObj = {}; 
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
