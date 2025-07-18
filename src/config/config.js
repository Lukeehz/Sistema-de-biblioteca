const exphbs = require("express-handlebars");

const hbs = exphbs.create({
  helpers: {
    cleanGenres: function (genreStr) {
      if (!genreStr) return "";
      try {
        const parsed = JSON.parse(genreStr);
        return Array.isArray(parsed) ? parsed.join(", ") : genreStr;
      } catch {
        return genreStr.replace(/[\[\]"]+/g, "");
      }
    },
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
  },
  extname: ".handlebars",
  defaultLayout: "main",
});

module.exports = hbs;
