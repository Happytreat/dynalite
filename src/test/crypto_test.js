/**
 * @fileoverview This is used to test crypto encryption and decryption within the project.
 * To use, create a .env file containing ALGORITHM and KEY (e.g. ALGORITHM=des, KEY=applepen).
 * Update dotenv_path to the location of the .env file.
 * Remember to npm install crypto and dotenv modules.
 * To run this script, type 'node crypto_test.js <text>' where <text> is the text to be encrypted.
 */
/*
 * Module dependencies.
 */
crypto = require('crypto');
dotenv =  require('dotenv');
path = require('path');
/*
 * Setup
 */
/* .dotenv variables */
const dotenv_path = '../.env'; // Modify if necessary
dotenv.config({path: dotenv_path});
const algorithm = process.env.ALGORITHM;
const key = process.env.KEY;
/* Colours */
const cRed = '\x1b[31m';
const cGreen = '\x1b[32m';
const cYellow = '\x1b[33m';
const cReset = '\x1b[0m'; // Resets the console colour
/*
 * Input
 */
// Takes in a single parameter <text> which will be encrypted and decrypted.
let text = process.argv[2];
if (typeof text == 'undefined' && !text) {
    filename = path.basename(__filename);
    console.log(`${cRed}Missing parameter: <text>${cReset}\nUsage: node ${filename} <text>`);
    process.exit(1);
}

/*
 * Encryption
 */
const cipher = crypto.createCipher(algorithm, key);
let encrypted = cipher.update(text, 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(`Encrypted message:\t${cYellow}${encrypted}${cReset}`);

/*
 * Decryption
 */
const decipher = crypto.createDecipher(algorithm, key);
decipher.setAutoPadding(false);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
decrypted = decrypted.trim();
console.log(`Decrypted message:\t${cGreen}${decrypted}${cReset}`);