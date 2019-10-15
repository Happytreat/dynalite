var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var dummy_data = [
    { type: "Confirmable(0)", id: "57602", payload: 
      {"timestamp":1571142032134,"light_id":"1","light_status":0}
    },
    { type: "Non-confirmable(1)", id: "32331", payload: 
      {"timestamp":1571142113376,"light_id":"2","light_status":1}
    },
    { type: "Acknowledgement (2)", id: "57358", payload: 
      {"timestamp":1571142118639,"light_id":"1","light_status":0}
    },
    { type: "Reset (3)", id: "30969", payload: 
      {"timestamp":1571142122891,"light_id":"2","light_status":1}
    }
  ];

  res.render('index', { 
    data: dummy_data
  });
});

module.exports = router;
