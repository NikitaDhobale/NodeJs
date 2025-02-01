const express = require('express');
const db = require('../models/db');
const router = express.Router();

// Product routes
router.get('/:page', (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  db.query('SELECT p.id, p.name AS productName, c.name AS categoryName, p.category_id FROM products p JOIN categories c ON p.category_id = c.id LIMIT ? OFFSET ?', [pageSize, offset], (err, products) => {
    if (err) throw err;

    db.query('SELECT COUNT(*) AS total FROM products', (err, result) => {
      if (err) throw err;
      const totalProducts = result[0].total;
      const totalPages = Math.ceil(totalProducts / pageSize);

      db.query('SELECT * FROM categories', (err, categories) => {
        if (err) throw err;
        res.render('products', { products, categories, currentPage: page, totalPages });
      });
    });
  });
});

router.post('/', (req, res) => {
  const { name, category_id } = req.body;
  db.query('INSERT INTO products (name, category_id) VALUES (?, ?)', [name, category_id], (err) => {
    if (err) throw err;
    res.redirect('/products/1');
  });
});

router.post('/update/:id', (req, res) => {
  const { name, category_id } = req.body;
  db.query('UPDATE products SET name = ?, category_id = ? WHERE id = ?', [name, category_id, req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/products/1');
  });
});

router.post('/delete/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/products/1');
  });
});

module.exports = router;
