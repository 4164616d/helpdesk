from classes.User import User
import controllers.databaseController as db
import bcrypt
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from functools import wraps
from flask import request, abort
import json

load_dotenv()

def login(request):
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    print(request)

    user = db.get_user(email)
    if(passwordIsCorrect(password, user.get_passwordHash())):
        type = user.get_type()
        id = user.get_id()
        fp = generateFingerprint(request)
        return { 'token': generateToken(id, email, type, fp), 'type': type, 'email':email }
    else:
        abort(401, "Incorrect email or password")

def generateFingerprint(request):
    try:
        ip = request.remote_addr 
        userAgent = request.headers.get('User-Agent')
        fp = abs(hash(ip + userAgent)) % (10 ** 20)
        print(fp)
        return fp
    except:
        abort(400, 'Cannot get device fingerprint')

def register(email, password, type):
    if(db.emailIsRegistered(email)):
      abort(400, 'Email already registered')
    else:
      user = User(email, hashPassword(password), type)
      db.insert_user(user)

def hashPassword(password):
    salt = bcrypt.gensalt(rounds=10)
    return bcrypt.hashpw(password.encode('utf8'), salt)

def passwordIsCorrect(password, hash):    
    return bcrypt.checkpw(password.encode('utf8'), str(hash).encode('utf8'))
        
def generateToken(id, email, type, fp):
    dt = datetime.now() + timedelta(hours=2)
    return jwt.encode({"id": id, "email": email, "type": type, "iss": fp, 'exp': dt}, os.getenv('JWT_SECRET'), algorithm="HS256")

def authorize(f):
    @wraps(f)
    def decorated_function(*args, **kws):
            if not 'Authorization' in request.headers:
               abort(401, "Authorization header is required")

            user = None
            data = request.headers['Authorization']
            token = str.replace(str(data), 'Bearer ','')
            fp = generateFingerprint(request)
            try:
                decoded = jwt.decode(token, os.getenv('JWT_SECRET'), issuer=fp, algorithms=["HS256"], options={"require": ["iss"]})
                email = decoded["email"]
                type = decoded["type"]
                id = decoded["id"]
                user = User(email,"",type)
                user.set_id(id)
            except jwt.ExpiredSignatureError:
                abort(401, "Token Expired")
            except jwt.InvalidTokenError:
                abort(401, "Invalid Token")

            return f(user, *args, **kws)            
    return decorated_function