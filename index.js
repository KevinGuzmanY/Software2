const express = require('express');
const mongoose = require('mongoose');
const securityController = require('./interfaces/controlador/securityController');
const productController = require('./interfaces/controlador/productController');

const app = express();
app.use(express.json());

app.use('/api/v1/security', securityController);
app.use('/api/v1/product', productController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos MongoDB');
});

