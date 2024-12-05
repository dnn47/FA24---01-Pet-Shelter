# db.py
from flask_sqlalchemy import SQLAlchemy

# Create SQLAlchemy object for ORM functionality
db = SQLAlchemy()

# Initialize the database with Flask
def create_session(app):
    db.init_app(app)  # Initialize the app with the db object
