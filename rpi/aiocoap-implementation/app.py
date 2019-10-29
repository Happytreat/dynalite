#!/usr/bin/env python3
# encoding: utf-8

# This code requires: aiocoap and pycrypto
# pip3 install aiocoap pycrypto

import asyncio
import logging

from aiocoap_helper import coap_post
from constants import COAP_RECEIVER_URI, TIME_INTERVAL, LIGHT_SENSOR_INTERVAL, LIGHT_SENSOR_ITERATIONS, get_enc_key, get_rpi_id
from light_sensor import get_light_value
from payload_helper import build_payload, encrypt_payload

logging.basicConfig(level=logging.INFO)

async def main():
    """
    Perform a single POST request to localhost on the default port every TIME_INTERVAL seconds.
    """

    while True:
        # Set values that we will need to use
        # sum of light values until we send the data
        light_value_sum = 0
        # set iterations until we send
        iterations_until_send = LIGHT_SENSOR_ITERATIONS

        # Keep reading light until time to send
        while iterations_until_send > 0:
            light_value_sum += get_light_value(LIGHT_SENSOR_INTERVAL)
            iterations_until_send -= 1

        # Round value to either 0 or 1 to indicate if light was off or on majority of interval
        is_occupied = round(light_value_sum / LIGHT_SENSOR_ITERATIONS)
        
        # Prepare payload
        payload = encrypt_payload(ENC_KEY, build_payload(RPI_ID, is_occupied))
        
        # Keep attempting to send payload until we manage to do so
        while True:
            try:
                response = await coap_post(COAP_RECEIVER_URI, payload)
                # Print response (for logging purposes)
                print('Response from server: %s\n%r'%(response.code, response.payload))
                break
            except Exception as e:
                print(e)

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
