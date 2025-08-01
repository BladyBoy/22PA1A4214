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

// Checking if a shortcode is available (not already used)
function isShortcodeAvailable(shortcode) {
  return !urlDatabase.has(shortcode);
}

// Adding a new URL record to the database
function addUrlRecord(urlRecord) {
  urlDatabase.set(urlRecord.shortcode, urlRecord);
}

// Retrieving a URL record by shortcode
function getUrlRecord(shortcode) {
  return urlDatabase.get(shortcode);
}

module.exports = {
  urlDatabase,
  isShortcodeAvailable,
  addUrlRecord,
  getUrlRecord,
};
