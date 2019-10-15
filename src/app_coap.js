const router = require("coap-router");
const app_coap = router();

app_coap.get("/", (req, res) => {
    res.end("Hello COAP");
});

module.exports = app_coap;
