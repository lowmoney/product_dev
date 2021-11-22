from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, status
from secrets import token_urlsafe
from deta import Deta

deta = Deta('b063huxq_puJ1My3CiVDT3UfH5BWG5wKWuHt7Q2es')
user_db = deta.Base('users')
sessions_db = deta.Base('sessions')

class Register(BaseModel):
    username : str
    password : str
    re_entered_password : str

class User(BaseModel):
    username : str

class Login(BaseModel):
    username : str
    password : str

class Session(BaseModel):
    username : str
    key : str

class ValidSession(BaseModel):
    valid : bool = False

app = FastAPI(root_path="/auth/")


@app.post("/register", response_model=User)
def register(user:Register):
    if user.password == user.re_entered_password:
        try:
            user_db.insert({'password':user.password}, user.username)
        except:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="credentials are not valid")
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="credentials are not valid")

    return user


@app.post("/login", response_model=Session)
def login(user : Login):
    user_record = user_db.get(user.username)
    if user_record:
        if user_record['password'] == user.password:
            session = sessions_db.insert({'key':token_urlsafe(32)}, user.username)
        else:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="credentials are not valid")
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="credentials are not valid")


    return Session(**{'username':user.username,'key':session['key']})


@app.put("/logout", response_model=User)
def logout(user : Session):
    session = sessions_db.get(user.username)
    if session:
        sessions_db.delete(user.username)
    
    return user

@app.get("/session", response_model=ValidSession)
def read_session(session:Session):
    session_record = sessions_db.get(session.key)
    if session_record:
        return ValidSession(**{"valid":True})
    else:
        return ValidSession()