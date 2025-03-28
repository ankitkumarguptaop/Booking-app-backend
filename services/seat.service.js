const { eventRepository } = require("../repositories");
const seatRepository = require("../repositories/seat.repository");
const Producer = require("../workers/producer");
const producer = new Producer();

exports.allocateSeats = async (payload) => {
  const { totalSeats, eventId } = payload.body;
  const { email, name } = payload.user;

  const { id } = payload.user;

  let seats = [];
  for (let i = 0; i < totalSeats; i++) {
    seats.push({ buyer_id: id, event_id: eventId });
  }

  const response = await seatRepository.createBulk(seats);
  const eventDetails = await eventRepository.findOne({ id: eventId });

  await producer.publishMessage(
    "Mail",
    {
      email: email,
      totalTickets: totalSeats,
      name: name,
      ...eventDetails.dataValues,
      eventName: eventDetails.dataValues.name,
    },
    "sendMail"
  );

  return response;
};

exports.countAllocatedSeats = async (payload) => {
  const { eventId } = payload.params;

  const response = await seatRepository.count({
    criteria: { event_id: eventId },
  });

  return response;
};
