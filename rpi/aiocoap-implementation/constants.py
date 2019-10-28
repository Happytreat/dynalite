#!/usr/bin/env python3
# encoding: utf-8
"""
Constants.py to store constants.
"""
# URI of server
COAP_RECEIVER_URI = "coap://evantay.com/"
# Interval at which we should send data (seconds)
TIME_INTERVAL = 60
# Interval at which we should read LDR (seconds)
LIGHT_SENSOR_INTERVAL = 0.5
# Number of times LDR is read until data is sent
# Note that this would cause clock drift, but it isn't crucial for our use case
LIGHT_SENSOR_ITERATIONS = TIME_INTERVAL / LIGHT_SENSOR_INTERVAL