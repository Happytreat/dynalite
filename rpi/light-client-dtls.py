import time

import logging
import asyncio

from aiocoap import *

import rpi

######################## CONFIG ########################
WEBSERVER_URI = "coap://127.0.0.1/light"

POST_INTERVAL = 3.0 # in seconds

######################## CoAP with DTLS ########################
logging.basicConfig(level=logging.INFO)

async def main():
    context = await Context.create_client_context()
    context.client_credentials.load_from_dict(
            {'coaps://localhost/*': {'dtls': {
                'psk': b'secretPSK',
                'client-identity': b'client_Identity',
                }}})
    await asyncio.sleep(2)

    while True:
        payload = rpi.get_light_value().encode('utf-8')
        request = Message(code=POST, payload=payload, uri=WEBSERVER_URI)
        response = await context.request(request).response
        print(response)
        time.sleep(60)

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
