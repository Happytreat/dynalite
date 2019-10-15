const router = require("coap-router");
const app_coap = router();

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
  
    console.log("COAP " + req.method + " " + type + ": " + req._packet.messageId + ": " + req.payload);
});

module.exports = app_coap;
