const BookModel = require("../models/Book.model");

const router = require("express").Router();
const Book = require("../models/Book.model");

router.get("/books", (req, res, next) => {
  Book.find()
    .then((booksFromDB) => {
      // const data = {
      //     booksArr: booksFromDB
      // }

      console.log(booksFromDB);
      res.render("books/books-list", { booksFromDB });
    })
    .catch((err) => {
      console.log("Error getting list of books from DB", err);
      next(err);
    });
});

router.get("/books/create", (req, res, next) => {
  res.render("books/book-create");
});

router.post("/books/create", (req, res, next) => {
  // const bookTitle = req.body.title;
  // const bookAuthor = req.body.author;
  // const bookDescription = req.body.description;
  // const bookRating = req.body.rating;

  // const data = {
  //     title: bookTitle,
  //     author: bookAuthor,
  //     description: bookDescription,
  //     rating: bookRating
  // }

  // bookAuthor.create(data);

  const { title, author, description, rating } = req.body;
  Book.create({ title, author, description, rating })
    .then(() => {
         res.redirect("/books")

    })
    .catch((err) => {
      console.log("err creating new book in DB", err);
      next(err);
    });
});

router.get("/books/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then((bookFromDB) => {
      console.log(bookFromDB);
      res.render("books/books-details", { bookFromDB });
    })
    .catch((err) => {
      console.log("err getting book details for a single book in DB", err);
      next(err);
    });
});

module.exports = router;
