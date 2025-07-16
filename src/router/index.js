const express = require ("express");
const app = express()
const exphbs = require ("express-handlebars");
const conn = require("../db/conn");
const Library = require ("../models/Book");
const { handlebars } = require("express-hbs");
const path = require("path");
const router = express.Router()
const { Op } = require("sequelize");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

router.post("/add", async (req, res) => {
  const {
    name,
    author,
    image,
    rating,
    format,
    isBorrowed,
    borrowedBy,
    adress
  } = req.body;

  let genres = req.body.genres || [];

  if (!Array.isArray(genres)) {
    genres = [genres];
  }

  const newBook = await Library.create({
    name,
    author,
    image,
    genre: JSON.stringify(genres), 
    rating,
    format,
    isBorrowed: !!parseInt(isBorrowed),
    borrowedBy: borrowedBy || null,
    adress
  });

  res.redirect("/livro/add");
});

router.get("/add", (req,res)=>{
    res.render("addlivro.handlebars")
})

router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.q || "";

    let whereCondition = {};

    if (searchQuery) {
      const likeQuery = `%${searchQuery}%`;

      whereCondition = {
        [Op.or]: [
          { id: !isNaN(searchQuery) ? searchQuery : -1 },
          { name: { [Op.iLike]: likeQuery } },
          { author: { [Op.iLike]: likeQuery } },
          { genre: { [Op.iLike]: likeQuery } },
        ],
      };
    }

    let livros = await Library.findAll({ where: whereCondition, raw: true });

    livros = livros.map((livro) => {
      try {
        const genresArray = JSON.parse(livro.genre);
        livro.genre = genresArray.join(", ");
      } catch {
        livro.genre = livro.genre || "";
      }
      return livro;
    });
    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      return res.json(livros);
    }

    res.render("book", { livro: livros, q: searchQuery });
  } catch (err) {
    console.error("Erro ao carregar livros:", err);
    res.status(500).send("Erro interno");
  }
});


module.exports = router