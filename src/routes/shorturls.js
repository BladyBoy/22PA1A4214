const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToUrl, getShortUrlStats } = require('../controllers/shorturlsController');

// Route to create a new short URL
router.post('/shorturls', createShortUrl);

// Redirect to original URL using shortcode (root-level)
router.get('/:shortcode', redirectToUrl);

// Get statistics for a shortcode
router.get('/shorturls/:shortcode', getShortUrlStats);

module.exports = router;
