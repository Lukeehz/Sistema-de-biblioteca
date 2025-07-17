const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Library = require("../models/Book");

// Middleware para parsing do body
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/add", (req, res) => {
  res.render("addlivro.handlebars");
});

// Cadastro de livro
router.post("/add", async (req, res) => {
  const {
    name,
    author,
    image,
    isbn,
    rating,
    format,
    isBorrowed,
    borrowedBy,
    adress,
  } = req.body;

  let genres = req.body.genres || [];
  if (!Array.isArray(genres)) {
    genres = [genres];
  }

  await Library.create({
    name,
    author,
    image,
    genre: JSON.stringify(genres),
    isbn,
    rating,
    format,
    isBorrowed: !!parseInt(isBorrowed),
    borrowedBy: borrowedBy || null,
    adress,
  });

res.redirect("/livro/add");

});


router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const livro = await Library.findOne({ where: { id }, raw: true });
    if (!livro) return res.status(404).send("Livro não encontrado");

    console.log("Livro encontrado:", livro);

    res.render("editlivro", { livro });
  } catch (err) {
    console.error("Erro ao carregar livro:", err);
    res.status(500).send("Erro ao carregar livro");
  }
});


router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;

  const {
    name,
    author,
    image,
    rating,
    format,
    isBorrowed,
    borrowedBy,
    adress,
  } = req.body;

  let genres = req.body.genres || [];
  if (!Array.isArray(genres)) {
    genres = [genres];
  }

  try {
    await Library.update(
      {
        name,
        author,
        image,
        genre: JSON.stringify(genres),
        rating,
        format,
        isBorrowed: !!parseInt(isBorrowed),
        borrowedBy: borrowedBy || null,
        adress,
      },
      {
        where: { id },
      }
    );

    res.redirect("/livro");
  } catch (err) {
    console.error("Erro ao atualizar livro:", err);
    res.status(500).send("Erro interno");
  }
});

// Rota para deletar livro
router.post("/delete/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const deleted = await Library.destroy({ where: { id: bookId } });

    if (deleted) {
      console.log(`Livro ${bookId} deletado`);
      return res.redirect("/livro");
    } else {
      console.log(`Livro ${bookId} não encontrado`);
      return res.status(404).send("Livro não encontrado");
    }
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    return res.status(500).send("Erro interno");
  }
});

router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.q || "";
    let whereCondition = {};

    if (searchQuery) {
      const likeQuery = `%${searchQuery}%`;

      whereCondition = {
        [Op.or]: [
          { id: !isNaN(searchQuery) ? searchQuery : -1 },
          { name: { [Op.like]: likeQuery } },
          { author: { [Op.like]: likeQuery } },
          { genre: { [Op.like]: likeQuery } },
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

module.exports = router;
