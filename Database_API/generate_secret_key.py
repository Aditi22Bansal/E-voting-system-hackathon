import secrets

# Generate a 64-byte long hex string
secret_key = secrets.token_hex(64)
print(secret_key)
