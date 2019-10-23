/*
 * Module dependencies.
 */
const crypto = require('crypto');
const router = require('coap-router');
const app_coap = router();

/*
 * Setup
 */
/* Database connection */
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const sql_query = 'INSERT INTO coap_post (type, id, payload) VALUES';
/* .dotenv variables */
const algorithm = process.env.ALGORITHM;
const key = process.env.KEY;
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
    let type; // For console display usage
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

    m = req.method;
    id = req._packet.messageId;
    pl = req.payload;
    console.log(`COAP ${m}, Type: ${type_output}, ID: ${id}, Payload: ${cYellow}${pl}${cReset}`);

    try {
        const decipher = crypto.createDecipher(algorithm, key);
        let decrypted = decipher.update(pl.toString('utf8'), 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        console.log(`${cYellow}${pl}${cReset} -> ${cGreen}${decrypted}${cReset}`);
    } catch (err) {
        res.code = 403;
        console.log(`${cRed}Error:${cReset} Message decryption failed.\n` 
                + `Replied with ${cRed}COAP code 4.03${cReset}`);
        return res.end('Forbidden: Message decryption failed');
    }
    
	// Construct Specific SQL Query
    let insert_query = `${sql_query} ('${type}', ${id}, '${decrypted}')`;
    pool.query(insert_query, (err, result) => {
        if (err) {
            res.code = 500;
            console.log(`${cRed}Error:${cReset} SQL insert failed\n` 
                    + `Replied with ${cRed}COAP code 5.00${cReset}\n${err.message}`);
            return res.end('Error: SQL insert failed');
        } else {
            res.code = 200;
            console.log(`${cGreen}Success${cReset}: Inserted payload into database.\n`
                    + `Replied with ${cGreen}COAP code 2.01${cReset}`);
            return res.end('Inserted payload into database.');
        }
    });
});

module.exports = app_coap;
