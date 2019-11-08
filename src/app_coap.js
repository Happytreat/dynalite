/*
 * Module dependencies.
 */
import { ALGORITHM, KEY } from './util/secrets';
import crypto from 'crypto';
import router from 'coap-router';
import { Occupancy as occupancies } from './models/index';
const app_coap = router();

/* Colours */
const cRed = '\x1b[31m';
const cGreen = '\x1b[32m';
const cYellow = '\x1b[33m';
const cReset = '\x1b[0m'; // Resets the console colour

/*
 * Receive COAP POST messages and insert payload's data into
 * the database if message is successfully decrypted and authenticated.
 */
app_coap.post('/', (req, res) => {
    let type, type_output; // For console display usage
    if (req._packet.reset) {
        type = 'Reset (3)';
        type_output = `${cRed}${type}${cReset}`;
    } else {
        if (req._packet.ack) {
            type = 'Acknowledgement (2)';
        } else if (req._packet.confirmable) {
            type = 'Confirmable (0)';
        } else {
            type = 'Non-confirmable (1)';
        }

        type_output = `${cGreen}${type}${cReset}`;
    }

    const m = req.method;
    const id = req._packet.messageId;
    const pl = req.payload;
    console.log(`COAP ${m}, Type: ${type_output}, ID: ${id}, Payload: ${cYellow}${pl}${cReset}`);

    let decrypted;

    try {
        //IV set to all 0 for now
        const iv = '0000000000000000';
        //createDecipher is deprecated, using createDecipheriv instead
        const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
        decipher.setAutoPadding(false);
        //To confirm that this works, data is sent from RPi as base64
        decrypted = decipher.update(pl.toString('utf8'), 'base64', 'utf8') + decipher.final('utf8');
        decrypted = decrypted.trim();
        //Remove padding from encryption if any
        decrypted = decrypted.substr(0, decrypted.lastIndexOf('}') + 1);
        console.log(`${cYellow}${pl}${cReset} -> ${cGreen}${decrypted}${cReset}`);
    } catch (err) {
        res.code = 401; // Unauthorized
        console.log(`${cRed}Client error:${cReset} Unauthorized access\n` 
                + `Replied with ${cRed}COAP code 4.03${cReset}`);
        return res.end('Unauthorized: Invalid key and encryption');
    }
    
    try {
        decrypted = JSON.parse(decrypted);
    } catch (err) {
        res.code = 400; // Bad request
        console.log(`${cRed}Client error:${cReset} Payload is not JSON object\n` 
                + `Replied with ${cRed}COAP code 4.00${cReset}`);
        return res.end('Bad request: Payload is not JSON object');
    }

    const { rpiId, timestamp, isOccupied } = decrypted;

    return occupancies.create({
        rpiId,
        timestamp,
        isOccupied
    }).then((occupancy) => {
        if (occupancy) {
            res.code = 200; // Success ACK
            console.log(`${cGreen}Success${cReset}: Inserted payload into database.\n`
                    + `Replied with ${cGreen}COAP code 2.00${cReset}`);
            return res.end('OK: Inserted payload into database.');
        } else {
            res.code = 400; // Bad request
            console.log(`${cRed}Client error:${cReset} Incorrect or missing JSON payload fields.\n` 
                    + `Replied with ${cRed}COAP code 4.00${cReset}`);
            return res.end('Bad request: Incorrect or missing JSON payload fields.');
        }
    }).catch(err => {
        res.code = 500; // Internal server error
        console.log(`${cRed}Server error:${cReset} SQL insert failed.\n` 
                    + `Replied with ${cRed}COAP code 5.00${cReset}.\n${err.message}`);
        return res.end(`${cRed}Internal Server Error: SQL insert failed.${cReset}`);
    });
});

module.exports = app_coap;
