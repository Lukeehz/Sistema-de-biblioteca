const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const conn = require("./src/db/conn");
const Library = require("./src/models/Book");
const rotas = require("./src/router/index");

require("dotenv").config();

const app = express();

// Registra helper para limpar colchetes e aspas do gênero
const hbs = exphbs.create({
  helpers: {
    cleanGenres: function (genreStr) {
      if (!genreStr) return '';
      try {
        const parsed = JSON.parse(genreStr);
        return Array.isArray(parsed) ? parsed.join(", ") : genreStr;
      } catch (err) {
        return genreStr.replace(/[\[\]"]+/g, "");
      }
    }
  },
  extname: ".handlebars",
  defaultLayout: "main"
});


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src", "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Rotas
app.get("/helloworld", (req, res) => {
  res.render("helloworld");
});

app.use("/livro", rotas);

// Redireciona para /livro
app.get("/", (req, res) => {
  res.redirect("/livro");
});

// Conexão com o banco
conn
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server aberto na porta ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar ao banco:", error));
