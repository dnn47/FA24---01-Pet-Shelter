from flask import Flask
from flask_cors import CORS  # Import CORS
from config import Config
from db import create_session  # Import db initialization after creating the app

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for all domains
CORS(app)

# Initialize the database session
create_session(app)

# Import routes here after initializing the app
from routes.shelter_route import shelter_blueprint
from routes.animals_route import animal_blueprint
from routes.application_route import application_blueprint
from routes.user_route import user_blueprint

app.register_blueprint(animal_blueprint, url_prefix='/animals')
app.register_blueprint(application_blueprint, url_prefix='/applications')  
app.register_blueprint(shelter_blueprint, url_prefix='/shelter')
app.register_blueprint(user_blueprint, url_prefix='/user')

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
