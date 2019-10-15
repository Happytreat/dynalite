const router = require("coap-router");
const app_coap = router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

/* SQL Query */
var sql_query = 'INSERT INTO coap_post (type, id, payload) VALUES';

app_coap.post("/", (req, res) => {
    var type;
    if (req._packet.reset) {
        type = "Reset (3)";
    } else if (req._packet.ack) {
        type = "Acknowledgement (2)";
    } else if (req._packet.confirmable) {
        type = "Confirmable (0)";
    } else {
        type = "Non-confirmable (1)";
    }

    m = req.method;
    id = req._packet.messageId;
    pl = req.payload;

    console.log("COAP " + m + " " + type + ": " + id + ": " + pl);
    
	// Construct Specific SQL Query
	var insert_query = sql_query + "('" + type + "','" + id + "','" + pl + "')";
    pool.query(insert_query);
    res.end();
});

module.exports = app_coap;
