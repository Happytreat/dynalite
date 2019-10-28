/*
 * Module dependencies.
 */
const dotenv = require('dotenv');
import fs from 'fs';
/*
 * Setup
 */
/* Colours */
const cRed = '\x1b[31m';
const cGreen = '\x1b[32m';
const cYellow = '\x1b[33m';
const cReset = '\x1b[0m'; // Resets the console colour

if (fs.existsSync(".env")) {
  console.log(`${cYellow}[app] Attempting to locate '.env' file.${cReset}`);
  dotenv.config({ path: '.env' });
} else {
  console.error(`${cRed}[app] No '.env' file found.${cReset}`);
}

export const ENVIRONMENT = process.env.NODE_ENV || 'dev'; // Default to dev

export const DB_URI = process.env.DATABASE_URL || '';
if (!DB_URI) {
  console.error(`${cRed}[app] DATABASE_URL is not set in '.env'.${cReset}`);
  process.exit(1);
}

export const ALGORITHM = process.env.ALGORITHM || '';
if (!ALGORITHM) {
  console.error(`${cRed}[app] ALGORITHM is not set in '.env'.${cReset}`);
  process.exit(1);
}

export const KEY = process.env.KEY || '';
if (!KEY) {
  console.error(`${cRed}[app] KEY is not set in '.env'.${cReset}`);
  process.exit(1);
}

console.log(`${cGreen}[app] Using '.env' file for environment variables.${cReset}`);