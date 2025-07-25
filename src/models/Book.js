const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Book = db.define("Book", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  format: {
    type: DataTypes.STRING,
  },
  isBorrowed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  borrowedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  adress:{
    type: DataTypes.STRING,
  }
});

module.exports = Book;
