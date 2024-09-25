const crypto = require('crypto');

function generateSecretKey(length = 128) {
  return crypto.randomBytes(length).toString('hex'); // Generates a hex-encoded key
}

const secretKey = generateSecretKey();
console.log(`Your generated secret key: ${secretKey}`);
