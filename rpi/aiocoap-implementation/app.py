#!/usr/bin/env python3
# encoding: utf-8

import asyncio
import logging

from aiocoap_helper import coap_post
from constants import COAP_RECEIVER_URI

logging.basicConfig(level=logging.INFO)


async def main():
    """Perform a single POST request to localhost on the default port."""

    response = await coap_post(COAP_RECEIVER_URI, "If you see this then it worked! 555")
    print('Result: %s\n%r'%(response.code, response.payload))

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
    