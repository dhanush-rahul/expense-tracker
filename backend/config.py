import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_secret_key')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'my_jwt_secret_key')
    CATEGORIES = ['Entertainment', 'Food', 'Utilities', 'Transportation', 'Rent', 'Subscriptions']
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=45)

    MAIL_SERVER='smtp.gmail.com'
    MAIL_PORT=465
    MAIL_USE_SSL=True
    MAIL_USE_TLS = False  # You can also use TLS, but not both TLS and SSL
    MAIL_USERNAME='dhanushrahul555@gmail.com'
    MAIL_PASSWORD='feht haht vadr qpvk'
    MAIL_DEFAULT_SENDER = 'dhanushrahul555@gmail.com'

    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres.xfceexyyklzudavgzril:KmPLpQASnQOl1jbv@aws-0-ca-central-1.pooler.supabase.com:6543/postgres'

    # app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}'