const express = require ("express");
const app = express()
const exphbs = require ("express-handlebars");
const conn = require("../db/conn");
const Library = require ("../models/Library");
const { handlebars } = require("express-hbs");
const path = require("path");
const router = express.Router()

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

router.post("/add", async (req,res)=>{
    const name = req.body.name
    const author = req.body.author
    const image = req.body.image
    const genre = req.body.genre
    const rating = req.body.rating
    const format = req.body.format
    const isBorrowed = req.body.isBorrowed
    const borrowedBy = req.body.borrowedBy

    console.log(req.body)
    console.log("Chegou até aqui")

    await Library.create({name,author,image, genre,rating, format,isBorrowed,borrowedBy})
    res.redirect("/")

})

router.get("/add", (req,res)=>{
    res.render("addlivro.handlebars")
})

module.exports = router