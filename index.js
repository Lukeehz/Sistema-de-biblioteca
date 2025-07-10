const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./src/db/conn");
const Library = require("./src/models/Book");
const { handlebars } = require("express-hbs");
const path = require("path");
const rotas = require("./src/router/index");

require("dotenv").config();

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.set("views", path.join(__dirname, "src", "views"));
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/helloworld", (req, res) => {
  res.render("helloworld");
});

app.use("/livro", rotas);

app.get("/", (req, res) => {});

conn
  .sync()
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Server aberto na porta ${process.env.PORT}`);
  })
  .catch((error) => console.log("Erro: ", error));
