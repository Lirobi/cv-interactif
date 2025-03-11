const crypto = require('crypto');

// Generate a secure random string for JWT secret
const generateJwtSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

const jwtSecret = generateJwtSecret();
console.log('Generated JWT Secret:');
console.log(jwtSecret);
console.log('\nAdd this to your .env file as:');
console.log(`JWT_SECRET=${jwtSecret}`); 