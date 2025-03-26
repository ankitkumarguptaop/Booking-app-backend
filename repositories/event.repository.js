const event = require("../models/event");
const BaseRepository = require("./base.repository");

class EventRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new EventRepository({ model: event });
