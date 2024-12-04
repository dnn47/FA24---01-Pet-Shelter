from routes.animals_route import animal_blueprint
from routes.application_route import application_blueprint

def init_blueprints(app):
    #app.register_blueprint(shelter_blueprint, url_prefix="/shelters")
    app.register_blueprint(animal_blueprint, url_prefix="/animals")
    app.register_blueprint(application_blueprint, url_prefix="/applications")
