/**
 * @fileoverview This is used to test crypto encryption and decryption within the project.
 * To use, create a .env file containing ALGORITHM and KEY (e.g. ALGORITHM=des, KEY=applepen).
 * Update dotenv_path to the location of the .env file.
 * Remember to npm install crypto and dotenv modules.
 * To run this script, type 'node test_crypto.js <text>' where <text> is the text to be encrypted.
 */

const path = require('path');
const crypto = require('crypto');


const dotenv_path = '../.env'; // Modify if necessary
require('dotenv').config({path: dotenv_path});

// Takes in a single parameter <text> which will be encrypted and decrypted.
var text = process.argv[2];
if (typeof text == 'undefined' && !text) {
    filename = path.basename(__filename);
    console.log(`\x1b[31mMissing parameter: <text>\x1b[0m\nUsage: node ${filename} <text>`);
    process.exit(1);
}

const algorithm = process.env.ALGORITHM;
const key = process.env.KEY;

// Encryption
const cipher = crypto.createCipher(algorithm, key);
let encrypted = cipher.update(text, 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(`Encrypted message:\t\x1b[33m${encrypted}\x1b[0m`);

// Decryption
const decipher = crypto.createDecipher(algorithm, key);
decipher.setAutoPadding(false);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(`Decrypted message:\t\x1b[32m${decrypted.trim()}\x1b[0m`);