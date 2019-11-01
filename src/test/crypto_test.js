/**
 * @fileoverview This is used to test crypto encryption and decryption within the project.
 * To use, create a .env file containing ALGORITHM and KEY (e.g. ALGORITHM=des, KEY=applepen).
 * Update dotenv_path to the location of the .env file.
 * Remember to npm install crypto and dotenv modules.
 * To run this script, type 'node test_crypto.js <text>' where <text> is the text to be encrypted.
 */
/*
 * Module dependencies.
 */
const path = require('path');
const crypto = require('crypto');
/*
 * Setup
 */
/* .dotenv variables */
const dotenv_path = '../.env'; // Modify if necessary
require('dotenv').config({path: dotenv_path});
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
const iv = '0000000000000000';
const cipher = crypto.createCipheriv(algorithm, key, iv);  
const encrypted = cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
console.log(`Encrypted message:\t${cYellow}${encrypted}${cReset}`);

/*
 * Decryption
 */
const decipher = crypto.createDecipheriv(algorithm, key, iv);
decipher.setAutoPadding(false);
let decrypted = decipher.update(encrypted, 'base64', 'utf8') + decipher.final('utf8');
decrypted = decrypted.trim();
console.log(`Decrypted message:\t${cGreen}${decrypted}${cReset}`);
