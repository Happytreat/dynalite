#!/usr/bin/env python3
# encoding: utf-8

import asyncio
import logging

from aiocoap_helper import coap_post
from constants import COAP_RECEIVER_URI, TIME_INTERVAL
from light_sensor import get_light_value

logging.basicConfig(level=logging.INFO)


async def main():
    """
    Perform a single POST request to localhost on the default port every TIME_INTERVAL seconds.
    """
    while True:
        # Wait for interval
        await asyncio.sleep(TIME_INTERVAL)
        # Get light value
        light_value = get_light_value()
        # TODO: Encryption?
        payload = light_value
        try:
            # Send data to server
            response = await coap_post(COAP_RECEIVER_URI, payload)
            # Print response (probably not needed on live environment but whatever)
            print('Response from server: %s\n%r'%(response.code, response.payload))
        except Exception as e:
            print(e)

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())