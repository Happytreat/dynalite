# Raspberry Pi setup guide
The scripts to be deployed on the Raspberry Pis can be found in rpi/aiocoap-implementation. We are using [aiocoap](https://github.com/chrysn/aiocoap).

### The RPi setup
* Make sure the SD card you're booting the RPi on has a file named `ssl` to enable ssl.
* Ensure the RPi has python3 installed, as well as pycrypto and aiocoap.

### The RPi circuit setup
The connection of the LDR to the RPi can be seen in these images:
![RPi circuit 1](./images/rpi-circuit-1.jpg?raw=true)
![RPi circuit 2](./images/rpi-circuit-2.jpg?raw=true)

### Setting up the environment
Update the `rpi/aiocoap-implementation/.env` and `rpi/aiocoap-implementation/tests/.env` files to the correct information (RPI_ID and KEY).

### The Code
You can execute the code by running rpi/aiocoap-implementation/app.py with python3. 
