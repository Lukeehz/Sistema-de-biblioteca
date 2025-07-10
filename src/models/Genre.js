const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Genre = db.define("Genre", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Genre;
