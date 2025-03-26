const { eventRepository } = require("../repositories");

exports.createEvent = async (payload) => {
  const { name, details, seats, timing ,creater_id} = payload.body;
  const path = payload?.file?.path || null;
  const response = await eventRepository.create({
    name: name,
    details: details,
    image: path,
    seats: seats,
    timing: timing,
    creater_id:creater_id
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
