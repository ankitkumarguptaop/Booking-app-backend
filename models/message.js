"use strict";

const { Sequelize } = require("sequelize");
const { sequelize } = require("../configs/db");
const Users = require("./user");
const event = require("./event");

const Messages = sequelize.define(
  "Messages",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    sender_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    room_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "Events",
        key: "id",
      },
    },
    message: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    paranoid: true,
    modelName: "Messages",
    tableName: "Messages",
  }
);

Messages.belongsTo(Users, {
  as: "sender",
  foreignKey: "sender_id",
});

Users.hasMany(Messages, {
  as: "message",
  foreignKey: "sender_id",
});

Messages.belongsTo(event, {
  as: "chat",
  foreignKey: "room_id",
});

event.hasMany(Messages, {
  as: "messages",
  foreignKey: "room_id",
});



module.exports = Messages;
