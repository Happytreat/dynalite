#!/usr/bin/env python3
# encoding: utf-8

# This code requires: aiocoap and pycrypto
# pip install aiocoap pycrypto

import asyncio
import base64
import datetime
import logging

from aiocoap_helper import coap_post
from Crypto.Cipher import AES # pip install pycrypto
from constants import COAP_RECEIVER_URI, TIME_INTERVAL, LIGHT_SENSOR_INTERVAL, LIGHT_SENSOR_ITERATIONS
from light_sensor import get_light_value

logging.basicConfig(level=logging.INFO)

# Oof I implemented this before I found the dotenv library. Oh well
# You will need to include a .env file in the same directory as this code (see example .env provided)
rpi_id = 0
enc_key = 0
with open(".env", "r") as file:
    contents = file.read()
    m = re.search("^RPI_ID=(.*)$", contents)
    if m:
        rpi_id = m.group(1).strip()
    m = re.search("^KEY=(.*)$", contents)
    if m:
        enc_key = m.group(1).strip()

def _pad(s): 
    return s + (AES.block_size - len(s) % AES.block_size) * chr(AES.block_size - len(s) % AES.block_size) 

def _cipher():
    return AES.new(key=enc_key, mode=AES.MODE_CBC)

def encrypt_token(data):
    return _cipher().encrypt(_pad(data))

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

        # Prepare payload
        # Round value to either 0 or 1 to indicate if light was off or on majority of interval
        is_occupied = round(light_value_sum / LIGHT_SENSOR_ITERATIONS)
        # Package data into '{"dummy_data": "yes", "rpi_id": 1, "timestamp": "2018-12-25 09:27:53", "isOccupied": 1}'
        time_now = datetime.datetime.now()
        timestamp = time_now.strftime("%Y-%m-%d %H:%M:%S")
        data = '{"rpi_id": {}, "timestamp": "{}", "isOccupied": {}}'.format(rpi_id, timestamp, is_occupied)
        # Encrypt data
        payload = base64.b64encode(encrypt_token(data))
        
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