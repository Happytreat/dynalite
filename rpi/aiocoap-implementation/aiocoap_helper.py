#!/usr/bin/env python3
# encoding: utf-8
"""
aiocoap_helper.py to store helper functions for aiocoap usage.
"""

import logging
import asyncio

from aiocoap import Context, Message, POST

async def coap_post(uri, payload):
    """
    Takes in a String URI and a String payload.
    The string is posted to the uri provided.
    (full uri expected e.g. coap://localhost/)
    """
    context = await Context.create_client_context()
    request = Message(code=POST, payload=bytes(payload, 'utf-8'), uri=uri)
    response = await context.request(request).response
    return response
    