const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

// Route for creating a product
router.post('/', async (req, res) => {
    try {
        const product = await productService.createProduct(req.body, req.user._id);
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for updating a product
router.put('/:productId', async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.productId, req.body, req.user._id);
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for deleting a product
router.delete('/:productId', async (req, res) => {
    try {
        await productService.deleteProduct(req.params.productId, req.user._id);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for searching products
router.get('/', async (req, res) => {
    try {
        const products = await productService.searchProducts(req.query);
        res.json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for getting a product by ID
router.get('/:productId', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
