# /generate_secrets.py

import secrets
import hashlib

# Generate a secure, URL-safe string for the JWT secret (32 bytes -> 43 characters)
jwt_secret = secrets.token_urlsafe(32)

# Generate a secure password (16 bytes -> 22 characters)
admin_password = secrets.token_urlsafe(16)

# IMPORTANT: In a real application, you would hash this password before storing or comparing it.
# For now, we will use the plaintext password as per our plan, and upgrade to hashing later.
# Example of hashing (for future reference):
# password_hash = hashlib.sha256(admin_password.encode()).hexdigest()

print("✅ Secrets generated successfully!")
print("Please add the following lines to your /apps/api/.dev.vars file:\n")
print(f'JWT_SECRET="{jwt_secret}"')
print('ADMIN_EMAIL="dipishakalura1010@gmail.com"')
print(f'ADMIN_PASS_HASH="{admin_password}"')  # Note: Storing plaintext pass for now
