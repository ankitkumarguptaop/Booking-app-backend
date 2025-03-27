"use strict";

const { Sequelize } = require("sequelize");
const { sequelize } = require("../configs/db");
const event = require("./event");
const Users = require("./user");

const seat = sequelize.define(
  "Seats",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    event_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "Events",
        key: "id",
      },
    },
    buyer_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    modelName: "Seats",
    tableName: "Seats",
    paranoid: true,
  }
);

seat.belongsTo(event, {
  as: "event",
  foreignKey: "event_id",
});

event.hasMany(seat, {
  as: "events",
  foreignKey: "event_id",
});



seat.belongsTo(Users, {
  as: "user",
  foreignKey: "buyer_id",
});

Users.hasMany(seat, {
  as: "seats",
  foreignKey: "buyer_id",
});

module.exports = seat;
