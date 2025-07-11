const express = require ("express");
const app = express()
const exphbs = require ("express-handlebars");
const conn = require("../db/conn");
const Library = require ("../models/Book");
const { handlebars } = require("express-hbs");
const path = require("path");
const router = express.Router()

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
  } = req.body;

  let genres = req.body.genres || [];

  if (!Array.isArray(genres)) {
    genres = [genres];
  }

  const newBook = await Library.create({
    name,
    author,
    image,
    genre: JSON.stringify(genres), // JSON.stringify, não 'genre'
    rating,
    format,
    isBorrowed: !!parseInt(isBorrowed),
    borrowedBy: borrowedBy || null,
  });

  res.redirect("/livro/add");
});

router.get("/add", (req,res)=>{
    res.render("addlivro.handlebars")
})

module.exports = router