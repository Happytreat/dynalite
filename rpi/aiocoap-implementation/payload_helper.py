import base64
import datetime

from Crypto.Cipher import AES # pip install pycrypto

# https://dmyz.org/en/archives/1182
def _pad(s): 
    return s + (AES.block_size - len(s) % AES.block_size) * chr(AES.block_size - len(s) % AES.block_size) 

def _cipher(enc_key):
    # IV should not be all 0s btw but since server-side's IV is nothing we'll do the same
    iv = b'0000000000000000'
    return AES.new(key=enc_key, mode=AES.MODE_CBC, IV=iv)

def encrypt_token(enc_key, data):
    return _cipher(enc_key).encrypt(_pad(data))

def encrypt_payload(enc_key, data):
    return base64.b64encode(encrypt_token(enc_key, data))

def build_payload(rpi_id, is_occupied):
    """
    Helper function to build payload
    """
    time_now = datetime.datetime.now()
    timestamp = time_now.strftime("%Y-%m-%d %H:%M:%S")
    return '{{"rpi_id": {0}, "timestamp": "{1}", "isOccupied": {2}}}'.format(rpi_id, timestamp, is_occupied)
