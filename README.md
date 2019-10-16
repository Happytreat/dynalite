# dynalite

### rpi

These are the scripts run on the actual raspberry pis

To run without DTLS, install `txthings` using `pip`. Then, run `python light-client.py`. This is in python2 because of Twisted [not being fully ported](https://twistedmatrix.com/documents/14.0.2/core/howto/python3.html). txThings does not have support for DTLS yet.

To run with DTLS, install the development version of `aiocoap` by following the instructions [here](https://aiocoap.readthedocs.io/en/latest/installation.html). Then, run `python3 light-client-dtls.py`. This script is in python3.

`rpi.py` just contains a capacitor-reading code. It uses time to convert digital signals from the Raspberry Pi to analog signals. The full tutorial is [here](https://www.youtube.com/watch?v=dPwW9zmX84E). 

To run on an actual Pi and read from the GPIO pin, uncomment the GPIO portions. For testing on laptops, there will be no `RPi.GPIO` module.

The connection on the RaspberryPi is just the Pi, photoresistor and a capacitor in series. Without a capacitor, the code can still run but only reading digital signals (it can tell there is light, but not how much light).


