import sys
sys.path.append('../')

from payload_helper import encrypt_node

print("Running payload helper test")
payload = '{"rpi_id": 1, "timestamp": "2019-11-01 15:25:17", "isOccupied": 1}'
# Testing using a key of all 0s
enc_payload = encrypt_node(payload, '00000000000000000000000000000000')
print(enc_payload)
print(b'+sxS5B2qJSRqA4aIfI8W63RVqxuGonzQGepSeOnVEvHpYkR8T7+u5rOPR7o93xwa4F8FR/kj6qap5bn/PFTHZup42jstEsjpqkowLcGKrFo=')