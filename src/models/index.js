const Library = require("./Book");
const Genre = require("./Genre");

Library.belongsToMany(Genre, { through: "LibraryGenres" });
Genre.belongsToMany(Library, { through: "LibraryGenres" });

module.exports = {
  Library,
  Genre,
};
