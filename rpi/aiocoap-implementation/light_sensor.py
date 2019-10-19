#!/usr/bin/env python3
# encoding: utf-8
import random

######################## GPIO ########################

#GPIO.setmode(GPIO.BCM)
LIGHT_SENSOR_PIN = 4

def get_light_value():
    """
    Returns light value from RPi.
    As of now it's just a stub returning random values.
    """

    # TODO: Get light data

    #count = 0

    # reset the signal
    #GPIO.setup(LIGHT_SENSOR_PIN, GPIO.OUT)
    #GPIO.output(LIGHT_SENSOR_PIN, GPIO.LOW)
    #time.sleep(0.1)

    # change to input mode
    #GPIO.setup(LIGHT_SENSOR_PIN, GPIO.IN)

    #while (GPIO.input(LIGHT_SENSOR_PIN) == GPIO.LOW):
    #    count += 1

    #return count

    return str(random.random())

