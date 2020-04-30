const express = require('express');
const router = express.Router();

/** GET HOME PAGE */
router.get('/', (req, res, next) => {
    res.redirect('/books')
});

module.exports = router;