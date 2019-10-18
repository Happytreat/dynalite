'''
Created on 30-05-2019
CoAP client connects to CoAP server at defauly port 5683.
@author: Bhojan Anand   (adapted from sample codes)
'''
from __future__ import unicode_literals

import sys
from ipaddress import ip_address

from twisted.internet import reactor
from twisted.python import log

import txthings.coap as coap
import txthings.resource as resource


class Agent:
    """
    Example class which performs single GET request to coap.me
    port 5683 (official IANA assigned CoAP port), URI "test".
    Request is sent 1 second after initialization.

    Remote IP address is hardcoded - no DNS lookup is preformed.

    Method requestResource constructs the request message to
    remote endpoint. Then it sends the message using protocol.request().
    A deferred 'd' is returned from this operation.

    Deferred 'd' is fired internally by protocol, when complete response is received.

    Method printResponse is added as a callback to the deferred 'd'. This
    method's main purpose is to act upon received response (here it's simple print).
    """

    def __init__(self, protocol):
        self.protocol = protocol
        reactor.callLater(1, self.requestResource)

    def requestResource(self):
        request = coap.Message(code=coap.GET)
        # Send request to "coap://coap.me:5683/test"

        request.opt.uri_path = ['counter']
        #request.opt.uri_path = ['.well-known','core']
        request.opt.observe = 0
        request.remote = (u"127.0.0.1", coap.COAP_PORT)   #Change to appropriate remote IP
        d = protocol.request(request, observeCallback=self.printLaterResponse)
        d.addCallback(self.printResponse)
        d.addErrback(self.noResponse)

    def printResponse(self, response):
        print('First result: ' + response.payload)
        # reactor.stop()

    def printLaterResponse(self, response):
        print('Observe result: ' + response.payload)

    def noResponse(self, failure):
        print('Failed to fetch resource:')
        print(failure)
        # reactor.stop()


log.startLogging(sys.stdout)

endpoint = resource.Endpoint(None)
protocol = coap.Coap(endpoint)
client = Agent(protocol)

reactor.listenUDP(61616, protocol)  # , interface="::")
reactor.run()
