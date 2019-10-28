import express from 'express';
import { DB_URI } from '../util/secrets';

const router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: DB_URI
});

var sql_query = 'SELECT * FROM occupancies';

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(sql_query, (err, data) => {
		res.render('index', { 
			data: (data ? data.rows : [])
		});
	});
});

/* GET all historical occupancies data  */
router.get('/occupancy', function(req, res, next) {
	pool.query(sql_query, (err, data) => {
		  res.status(200).json(data["rows"]);
	  });
  });

module.exports = router;
