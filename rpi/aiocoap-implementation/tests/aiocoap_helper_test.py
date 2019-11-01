# Make modules visible by testcase
import asyncio
import sys
sys.path.append('../')

from aiocoap_helper import coap_post
from constants import COAP_RECEIVER_URI, get_enc_key, get_rpi_id
from payload_helper import build_payload, encrypt_payload

async def main():
    RPI_ID = get_rpi_id()
    ENC_KEY = get_enc_key()
    print ("Testing coap post:")
    print ("RPI_ID:", RPI_ID, "ENC_KEY", ENC_KEY)
    payload = build_payload(RPI_ID, 0)
    print (payload)
    encrypted_payload = encrypt_payload(ENC_KEY, payload)
    print (encrypt_payload)
    response = await coap_post(COAP_RECEIVER_URI, payload)
    print (response)

# Run test
asyncio.get_event_loop().run_until_complete(main())
