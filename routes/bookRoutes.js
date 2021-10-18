const BookModel = require('../models/Book.model');

const router = require('express').Router();
const Book = require('../models/Book.model');

router.get("/books", (req, res, next)=>{
    Book.find()
        .then((booksFromDB)=>{

            // const data = {
            //     booksArr: booksFromDB
            // }

            console.log(booksFromDB)
            res.render("books/books-list", {booksFromDB} )
        })
        .catch((err)=>{
            console.log("Error getting list of books from DB", err);
            next(err);

        });
})

module.exports = router;