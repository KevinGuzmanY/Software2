
const reviewService = require('../services/reviewService');

async function rateProduct(req, res) {
    try {
        await reviewService.rateProduct(req.params.productId, req.user._id, req.body.rating);
        res.sendStatus(201);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function reviewProduct(req, res) {
    try {
        await reviewService.reviewProduct(req.params.productId, req.user._id, req.body.content);
        res.sendStatus(201);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getAverageRating(req, res) {
    try {
        const averageRating = await reviewService.getAverageRating(req.params.productId);
        res.json({ averageRating });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { rateProduct, reviewProduct, getAverageRating };
