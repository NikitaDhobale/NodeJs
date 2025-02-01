const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
