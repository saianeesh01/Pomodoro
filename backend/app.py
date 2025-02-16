from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import os

if os.environ.get("RENDER"):
    print("Running on Render, skipping .env")
else:
    env_path = find_dotenv()
    if env_path:
        load_dotenv(env_path)
    else:
        raise RuntimeError("Could not find .env file!")

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')

# Database setup
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(120), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(255))

with app.app_context():
    db.create_all()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(debug=True, host='0.0.0.0', port=port)

