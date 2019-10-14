const coap = require('coap');

const coap_server = coap.createServer();

coap_server.on('request', function (req, res) {
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

    res.end(type + ': ' + req._packet.messageId + ': ' + req._packet.payload + '\n');
});

// the default CoAP port is 5683
coap_server.listen(function () {
    var req = coap.request('coap://localhost/werewr');
    var payload = {
        timestamp: Date.now(),
        light_id: '1',
        light_status: 1
    };

    req.write(JSON.stringify(payload));

    req.on('response', function (res) {
        res.pipe(process.stdout);
        res.on('end', function () {
            process.exit(0);
        });
    });

    req.end();
});