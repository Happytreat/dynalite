import base64
import codecs
import datetime

from Crypto.Cipher import AES # pip install pycrypto

# https://dmyz.org/en/archives/1182
# https://stackoverflow.com/questions/33156474/encrypt-using-node-js-crypto-aes256-and-decrypt-using-python2-7-pycrypto

BS = 16

def pad(data):
    padding = BS - len(data) % BS
    return data + padding * chr(padding)

def unpad(data):
    return data[0:-ord(data[-1])]

def decrypt_node(hex_data, key='0'*32, iv='0'*16):
    data = ''.join(map(chr, bytearray.fromhex(hex_data)))
    aes = AES.new(key, AES.MODE_CBC, iv)
    return unpad(aes.decrypt(data))

def encrypt_node(data, key='0'*32, iv='0'*16):
    aes = AES.new(key, AES.MODE_CBC, iv)
    return codecs.encode(aes.encrypt(pad(data)),'base64')

def build_encrypted_payload(rpi_id, key, is_occupied):
    """
    Helper function to build encrypted payload
    """
    time_now = datetime.datetime.now()
    timestamp = time_now.strftime("%Y-%m-%d %H:%M:%S")
    payload = '{{"rpi_id": {0}, "timestamp": "{1}", "isOccupied": {2}}}'.format(rpi_id, timestamp, is_occupied)
    print (payload)
    return encrypt_node(payload, key)
