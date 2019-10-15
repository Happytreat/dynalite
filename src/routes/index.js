var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

var sql_query = 'SELECT * FROM coap_post';

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(sql_query, (err, data) => {
    console.log(err);
		res.render('index', { 
			data: data.rows 
		});
	});
});

module.exports = router;
