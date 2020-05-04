const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const { Op } = require('sequelize');

//Helper function
function asyncHandler(cb) {
    return async(req, res, next) => {
        try {
            await cb(req, res, next);
        } catch(error) {
            next(error);
        }
    }
}

//Send a GET request to /books to show the full list of books
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
    res.render('index', { books, title: 'Books' })
}));

//Send a GET request to /books to show the create new book form
router.get('/new', (req, res) => {
    res.render('new-book', { book: {}, title: "New Book" })
});

//Send a POST request to /books/new to create a new book to the database
router.post('/new', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect("/books");
    }   catch(error) {
        if(error.name === "SequelizeValidationError") { // checking the error
            book = await Book.build(req.body);
            res.render('new-book', { book, errors: error.errors, title: 'New Book' })
        } else {
            throw error;
        }
    }
}));

//Send a GET request to /:id to show the book detail form
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        res.render('update-book', { book, title: 'Update Book' });
    } else {
        res.render("error", {title: '500 Internal Server Error'});
    }
}));

//Send a POST request to /:id to update a book info in the database
router.post('/:id', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if(book) {
            await book.update(req.body);
            res.redirect('/books');
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        if(error.name === "SequelizeValidationError") { // checking the error
            book = await Book.build(req.body);
            book.id = req.params.id; // make sure correct book gets updated
            res.render('update-book', { book, errors: error.errors, title: 'Update Book' })
        } else {
            throw error;
        }
    }
}));

//Send a POST request to /books/:id to delete a book in the database
router.post('/:id/delete', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        await book.destroy();
        res.redirect('/books');
    } else {
        res.sendStatus(404);
    }
}));

//Send a GET request /books/search to search a book in the database
router.get('/search', asyncHandler(async (req, res) => {
    let search = req.query.search;
    if(search) {
        const books = await Book.findAll({
            where: {
                [Op.or]: {
                    title: {[Op.like]: `%${search}%`},
                    author: {[Op.like]: `%${search}%`},
                    genre: {[Op.like]: `%${search}%`},
                    year: {[Op.like]: `%${search}%`},
                }
            }
        })
        res.render('search', { books });
    } else {
        res.sendStatus(404);
    }
}))


module.exports = router;
