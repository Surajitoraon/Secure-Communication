
from Crypto.Cipher import AES
import hashlib, base64

def derive_key(key):
    return hashlib.sha256(key.encode()).digest()

def encrypt_message(message, key):
    k = derive_key(key)
    cipher = AES.new(k, AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(message.encode())
    return base64.b64encode(cipher.nonce + tag + ciphertext).decode()
