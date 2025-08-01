const { URL } = require('url');
const { isShortcodeAvailable, addUrlRecord, getUrlRecord } = require('../models/urlStore');
const { generateUniqueShortcode } = require('../utils/shortCodeGenerator.js');

const BASE_URL = `http://localhost:3000`;

// Validating shortcode: alphanumeric only, length 2-10 characters
function isValidShortcode(code) {
  return /^[A-Za-z0-9]{2,10}$/.test(code);
}

// Validate URL format
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

// Creating a new short URL
exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;

    // Validate required URL
    if (!url || typeof url !== 'string' || !isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid or missing "url" parameter' });
    }

    // Validating validity
    let validityMinutes = 30; // 30 mins
    if (validity !== undefined) {
      if (
        typeof validity !== 'number' ||
        !Number.isInteger(validity) ||
        validity <= 0
      ) {
        return res.status(400).json({ error: '"validity" must be a positive integer' });
      }
      validityMinutes = validity;
    }

    // Validating and applying shortcode
    let shortCodeToUse;
    if (shortcode !== undefined) {
      if (typeof shortcode !== 'string' || !isValidShortcode(shortcode)) {
        return res.status(400).json({
          error: '"shortcode" must be alphanumeric and 4-10 characters in length',
        });
      }
      if (!isShortcodeAvailable(shortcode)) {
        return res.status(409).json({ error: 'Shortcode is already in use' });
      }
      shortCodeToUse = shortcode;
    } else {
      try {
        shortCodeToUse = generateUniqueShortcode(isShortcodeAvailable);
      } catch (error) {
        return res.status(500).json({ error: 'Could not generate unique shortcode, please try again' });
      }
    }

    // Preparing URL record with metadata
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + validityMinutes * 60 * 1000);

    const urlRecord = {
      originalUrl: url,
      shortcode: shortCodeToUse,
      createdAt,
      expiresAt,
      clicks: [],
    };

    // Save record to in-memory store
    addUrlRecord(urlRecord);

    // Respond with shortLink and expiry
    return res.status(201).json({
      shortLink: `${BASE_URL}/${shortCodeToUse}`,
      expiry: expiresAt.toISOString(),
    });

  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// redirecting to original URL and track click
exports.redirectToUrl = (req, res) => {
  try {
    const shortcode = req.params.shortcode;

    const urlRecord = getUrlRecord(shortcode);

    if (!urlRecord) {
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    const now = new Date();
    if (urlRecord.expiresAt < now) {
      return res.status(410).json({ error: 'Shortcode has expired' });
    }

    // Track click metadata
    const clickData = {
      timestamp: now,
      referrer: req.get('referer') || 'direct',
      geo: 'unknown', 
    };

    urlRecord.clicks.push(clickData);

    // Redirect user to the original URL
    return res.redirect(urlRecord.originalUrl);

  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Geting statistics for the shortcode
exports.getShortUrlStats = (req, res) => {
  try {
    const shortcode = req.params.shortcode;

    const urlRecord = getUrlRecord(shortcode);

    if (!urlRecord) {
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    const now = new Date();
    if (urlRecord.expiresAt < now) {
      return res.status(410).json({ error: 'Shortcode has expired' });
    }

    return res.json({
      originalUrl: urlRecord.originalUrl,
      createdAt: urlRecord.createdAt.toISOString(),
      expiresAt: urlRecord.expiresAt.toISOString(),
      totalClicks: urlRecord.clicks.length,
      clicks: urlRecord.clicks.map(click => ({
        timestamp: click.timestamp.toISOString(),
        referrer: click.referrer,
        geo: click.geo,
      })),
    });

  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
