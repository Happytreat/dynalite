# Raspberry Pi setup guide
The scripts to be deployed on the Raspberry Pis can be found in rpi/aiocoap-implementation. We are using [aiocoap](https://github.com/chrysn/aiocoap).

### The RPi setup
* Make sure the SD card you're booting the RPi on has a file named `ssl` to enable ssl.
* Ensure the RPi has python3 installed, as well as pycrypto and aiocoap.

### The RPi circuit setup
The connection of the Light Dependent Resistor (LDR) to the RPi (after weeks of optimization!) can be seen in these images:

<img src="images/rpi-circuit-1.jpg?raw=true" width="50%" title="RPi circuit 1" />

<img src="images/rpi-circuit-2.jpg?raw=true" width="50%" title="RPi circuit 2" />

Note that the longer of the LED (the anode) should be facing the yellow wire.

### Setting up the environment
* Copy the files from rpi/aiocoap-implementation into the RPi using scp or via some other method (e.g. USB).
* Update the `rpi/aiocoap-implementation/.env` and `rpi/aiocoap-implementation/tests/.env` files to your personal private RPI_ID and KEY.
* Other variables can be configured in `rpi/iocoap-implementation/constants.py`.

### The Code
* You can execute the code by running rpi/aiocoap-implementation/app.py with python3. 
