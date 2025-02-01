const express = require('express');
const db = require('../models/db');
const router = express.Router();

// Category routes
router.get('/', (req, res) => {
  db.query('SELECT * FROM categories', (err, categories) => {
    if (err) throw err;
    res.render('categories', { categories });
  });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO categories (name) VALUES (?)', [name], (err) => {
    if (err) throw err;
    res.redirect('/categories');
  });
});

router.post('/update/:id', (req, res) => {
  const { name } = req.body;
  db.query('UPDATE categories SET name = ? WHERE id = ?', [name, req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/categories');
  });
});

router.post('/delete/:id', (req, res) => {
  const categoryId = req.params.id;

  db.query('SELECT COUNT(*) AS productCount FROM products WHERE category_id = ?', [categoryId], (err, result) => {
    if (err) throw err;

    if (result[0].productCount > 0) {
      return res.send('<script>alert("Cannot delete category. There are products linked to it."); window.location="/categories";</script>');
    }

    db.query('DELETE FROM categories WHERE id = ?', [categoryId], (err) => {
      if (err) throw err;
      res.redirect('/categories');
    });
  });
});

module.exports = router;
