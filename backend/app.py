from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import os

# Load environment variables from the correct path
env_path = find_dotenv()
if env_path:
    load_dotenv(env_path)
else:
    raise RuntimeError("Could not find .env file!")

# Debugging: Print loaded environment variables
print("Loaded DATABASE_URL:", os.getenv("DATABASE_URL"))

app = Flask(__name__)

# Check if DATABASE_URL is set
database_url = os.getenv("DATABASE_URL")

if not database_url:
    raise RuntimeError("DATABASE_URL is not set in .env file! Check if .env file exists and is formatted correctly.")

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(120), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(255))

# Create tables
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Welcome to the Pomodoro Scheduler API!"

if __name__ == '__main__':
    app.run(debug=True)
