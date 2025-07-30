const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const CODE_LENGTH = 6; // Length of generated shortcode

// Generate a random alphanumeric string of length CODE_LENGTH
function generateRandomCode() {
  let result = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a unique shortcode using the provided availability check function
 * @param {function} isAvailableFn - Should return true if shortcode is free
 * @returns {string} unique shortcode
 * @throws {Error} if unable to generate unique shortcode within 10 attempts
 */
function generateUniqueShortcode(isAvailableFn) {
  let code;
  let attempts = 0;

  do {
    code = generateRandomCode();
    attempts++;
    if (attempts > 10) {
      throw new Error('Failed to generate unique shortcode after 10 attempts');
    }
  } while (!isAvailableFn(code));

  return code;
}

module.exports = {
  generateUniqueShortcode,
};
