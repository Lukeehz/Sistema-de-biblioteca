const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const conn = require("./src/db/conn");
const rotas = require("./src/router/index");
const hbs = require("./src/config/config");
require("dotenv").config();

const app = express();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

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
