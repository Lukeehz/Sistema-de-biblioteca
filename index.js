const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const conn = require("./src/db/conn");
const rotas = require("./src/router/index");

require("dotenv").config();

const app = express();

// Handlebars + helpers
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

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src", "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Rotas
app.use("/livro", rotas);

app.get("/", (req, res) => {
  res.redirect("/livro");
});

conn
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server aberto na porta ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar ao banco:", error));
