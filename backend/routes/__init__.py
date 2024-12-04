from routes.animals_route import animal_blueprint

def init_blueprints(app):
    #app.register_blueprint(shelter_blueprint, url_prefix="/shelters")
    app.register_blueprint(animal_blueprint, url_prefix="/animals")
