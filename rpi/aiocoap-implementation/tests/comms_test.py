# This code tests the sending portion of the application.
import asyncio
import logging

# Make modules visible by testcase
import sys
sys.path.append('../')

from aiocoap_helper import coap_post
from constants import COAP_RECEIVER_URI, TIME_INTERVAL, LIGHT_SENSOR_INTERVAL, LIGHT_SENSOR_ITERATIONS, get_enc_key, get_rpi_id
from payload_helper import build_encrypted_payload
from random import *

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
            light_value_sum += round(random())
            iterations_until_send -= 1

        # Round value to either 0 or 1 to indicate if light was off or on majority of interval
        is_occupied = round(light_value_sum / LIGHT_SENSOR_ITERATIONS)
        
        # Prepare payload
        payload = build_encrypted_payload("1", "00000000000000000000000000000000", is_occupied)
        print(payload)
        
        # Keep attempting to send payload until we manage to do so
        while True:
            try:
                response = await coap_post("coap://127.0.0.1/", payload.decode('utf-8'))
                # Print response (for logging purposes)
                print('Response from server: %s\n%r'%(response.code, response.payload))
                break
            except Exception as e:
                print('Exception:', e)
                break
        break

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
