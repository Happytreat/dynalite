import RPi.GPIO as GPIO

# Make modules visible by testcase
import sys
sys.path.append('../')

from light_sensor import get_light_value

# Run test
print ("Testing light sensor:")
try:
    while True:
        print (get_light_value(0.5))
except KeyboardInterrupt:
    pass
finally:
    GPIO.cleanup()
