// src/models/urlStore.js

const urlDatabase = new Map(); // Stores shortcodes mapped to URL records

// URL record structure:
// {
//   originalUrl: string,
//   shortcode: string,
//   createdAt: Date,
//   expiresAt: Date,
//   clicks: Array<{ timestamp: Date, referrer: string, geo: string }>
// }

// Check if a shortcode is available (not already used)
function isShortcodeAvailable(shortcode) {
  return !urlDatabase.has(shortcode);
}

// Add a new URL record to the database
function addUrlRecord(urlRecord) {
  urlDatabase.set(urlRecord.shortcode, urlRecord);
}

// Retrieve a URL record by shortcode
function getUrlRecord(shortcode) {
  return urlDatabase.get(shortcode);
}

module.exports = {
  urlDatabase,
  isShortcodeAvailable,
  addUrlRecord,
  getUrlRecord,
};
