/**
 * @fileoverview This is used to test crypto encryption and decryption within the project.
 * To use, create a .env file containing ALGORITHM and KEY (e.g. ALGORITHM=des, KEY=applepen).
 * Update dotenv_path to the location of the .env file.
 * Remember to npm install crypto and dotenv modules.
 * To run this script, type 'node ${filename} <key, value> [key, value]...'.
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
// Takes in at least two parameters <key> <value> which will be encrypted.
// More <key> <value> pairs may be added.
let parameters = process.argv.splice(2);

if (parameters.length < 1) {
    filename = path.basename(__filename);
    console.log(`${cRed}Missing JSON parameters: <key, value>${cReset}\n`
            + `Usage: node ${filename} <key, value> [key, value]...\n`
            + `Minimally one <key, value> pair required.\n`
            + `Additional [key] [value] pairs can be added.\n`
            + `Example: node ${filename} id 500`);
    process.exit(1);
} else if (parameters.length%2 != 0) {
    filename = path.basename(__filename);
    console.log(`${cRed}JSON parameters must come in pairs: <key, value>${cReset}\n`
            + `Usage: node ${filename} <key, value> [key, value]...\n`
            + `Minimally one <key, value> pair required.\n`
            + `Additional [key] [value] pairs can be added.\n`
            + `Example: node ${filename} id 500`);
    process.exit(1);
}

/**
 * Convert parameters into JSON object.
 */
let json_payload = { };
let i;
for (i = 0; i < parameters.length; i += 2) {
    json_payload[parameters[i]] = parameters[i + 1];
}

let text = JSON.stringify(json_payload);

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