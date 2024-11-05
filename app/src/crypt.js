const crypt = require("crypto");

const algorithm = 'aes-128-cbc';
const key = process.env.cipher; // Ensure this is a 16-byte key for 'aes-128-cbc'
const iv = Buffer.alloc(16, 0); // Using a fixed 16-byte IV (less secure)

const encrypt = (data) => {
    const cipher = crypt.createCipheriv(algorithm, Buffer.from(key, 'utf-8'), iv);
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decrypt = (encryptedData) => {
    const decipher = crypt.createDecipheriv(algorithm, Buffer.from(key, 'utf-8'), iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
};

// Export the functions
module.exports = { encrypt, decrypt };
