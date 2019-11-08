#!/usr/bin/env python3
# encoding: utf-8

import re

"""
Constants.py to store constants.
"""
# URI of server
COAP_RECEIVER_URI = "coap://evantay.com/"
# Interval at which we should send data (seconds)
TIME_INTERVAL = 60
# Interval at which we should read LDR (seconds)
LIGHT_SENSOR_INTERVAL = 3
# Number of times LDR is read until data is sent
# Note that this would cause clock drift, but it isn't crucial for our use case
LIGHT_SENSOR_ITERATIONS = TIME_INTERVAL / LIGHT_SENSOR_INTERVAL
# Max possible failures for sending RPi data
MAX_SEND_FAIL_COUNT = 10

# Oof I implemented this before I found the dotenv library. Oh well
# You will need to include a .env file in the same directory as this code (see example .env provided)
def get_rpi_id():
    with open(".env", "r") as file:
        contents = file.read()
        print (contents)
        m = re.search("RPI_ID=(.*)", contents)
        if m:
            return m.group(1).strip()
    return -1

def get_enc_key():
    with open(".env", "r") as file:
        contents = file.read()
        print (contents)
        m = re.search("KEY=(.*)", contents)
        if m:
            return m.group(1).strip()
    return -1
    