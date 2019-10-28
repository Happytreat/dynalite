#!/usr/bin/env python3
# encoding: utf-8

import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
LIGHT_SENSOR_PIN = 7

def get_light_value(light_sensor_interval):
    """
    Returns light value from RPi (0 or 1)
    Accepts light_sensor_interval which is the interval to sleep until light value is read.
    """

    # reset the signal
    GPIO.setup(LIGHT_SENSOR_PIN, GPIO.OUT)
    GPIO.output(LIGHT_SENSOR_PIN, GPIO.LOW)
    time.sleep(light_sensor_interval)

    # change to input mode
    GPIO.setup(LIGHT_SENSOR_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    return GPIO.input(LIGHT_SENSOR_PIN)
