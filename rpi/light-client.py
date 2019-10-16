'''
CoAP Client that runs on Rpi, sends CoAP POST to Web Server
'''

import sys
import time
from ipaddress import ip_address

from twisted.internet import reactor, task
from twisted.python import log

import txthings.coap as coap
import txthings.resource as resource

import rpi

######################## CONFIG ########################
WEBSERVER_IP = "127.0.0.1"
WEBSERVER_PORT = coap.COAP_PORT

POST_INTERVAL = 1.0 # in seconds

######################## CoAP ########################

class UnsafeAgent:

    def __init__(self, protocol):
        self.protocol = protocol
        looper = task.LoopingCall(self.callReactor)
        looper.start(POST_INTERVAL) # call every second

    def callReactor(self):
        reactor.callLater(1, self.postResource)

    def postResource(self):
        payload = "test" #rpi.get_light_value()
        # include time?
        request = coap.Message(code=coap.POST, payload=payload)
        request.opt.uri_path = ("light", )
        request.opt.content_format = coap.media_types_rev['text/plain']
        request.remote = (WEBSERVER_IP, coap.COAP_PORT)

        d = protocol.request(request)
        #d.addCallback(self.printResponse)

    def printResponse(self, response):
        print "done"
        #print "Response Code:", coap.responses[response.code]

log.startLogging(sys.stdout)

endpoint = resource.Endpoint(None)
protocol = coap.Coap(endpoint)
client = UnsafeAgent(protocol)

reactor.listenUDP(61616, protocol)  # , interface="::")
reactor.run()
