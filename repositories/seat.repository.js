const seat = require("../models/seat");
const BaseRepository = require("./base.repository");

class SeatRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new SeatRepository({ model: seat });
