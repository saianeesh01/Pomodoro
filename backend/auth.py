from flask import Flask, redirect, request, session
from requests_oauthlib import OAuth2Session
import os

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = "http://localhost:5000/callback"

app = Flask(__name__)
app.secret_key = "super_secret_key"

@app.route('/login')
def login():
    google = OAuth2Session(GOOGLE_CLIENT_ID, redirect_uri=REDIRECT_URI, scope=[
        "https://www.googleapis.com/auth/calendar"])
    authorization_url, state = google.authorization_url(
        "https://accounts.google.com/o/oauth2/auth")
    session["oauth_state"] = state
    return redirect(authorization_url)

@app.route('/callback')
def callback():
    google = OAuth2Session(GOOGLE_CLIENT_ID, redirect_uri=REDIRECT_URI)
    token = google.fetch_token(
        "https://oauth2.googleapis.com/token",
        authorization_response=request.url,
        client_secret=GOOGLE_CLIENT_SECRET
    )
    session["oauth_token"] = token
    return "Login Successful!"

if __name__ == '__main__':
    app.run(debug=True)
