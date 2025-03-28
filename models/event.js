"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const Users = require("./user");

const event = sequelize.define(
  "Events",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [3, 30],
          msg: "name length should lies between 1 to 30",
        },
      },
      require: true,
    },
    details: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [10, 1000],
          msg: "detail length should lies between 10 to 100",
        },
      },
    },
    image: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    seats: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    // place: {
    //    allowNull: false,
    //   type: Sequelize.STRING,
    // },
    timing: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ["pending", "rejected", "approved"],
      defaultValue: "pending",
    },
    creater_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    ticket_price: {
      allowNull: false,
      type: Sequelize.STRING,
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
    modelName: "Events",
    tableName: "Events",
    paranoid: true,
  }
);

event.belongsTo(Users, {
  as: "user",
  foreignKey: "creater_id",
});

Users.hasMany(event, {
  as: "events",
  foreignKey: "creater_id",
});

module.exports = event;
