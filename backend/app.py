# app.py
from flask import Flask
from config import Config
from db import create_session  # Import db initialization after creating the app

app = Flask(__name__)
app.config.from_object(Config)

# Initialize the database session
create_session(app)

# Import routes here after initializing the app
from routes.animals_route import animal_blueprint

app.register_blueprint(animal_blueprint, url_prefix='/animals')

# Example route to test the connection
@app.route('/')
def index():
    try:
        from db import get_connection  # Import connection function inside the function
        engine = get_connection()
        connection = engine.connect()  # This establishes the connection
        return "Database connection successful!"
    except Exception as ex:
        return f"Error connecting to database: {ex}"

if __name__ == '__main__':
    app.run(debug=True)
