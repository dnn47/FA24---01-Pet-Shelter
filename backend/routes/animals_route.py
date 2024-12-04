from flask import Blueprint, jsonify, request
from models import Animal, Shelter, db
from sqlalchemy import and_

animal_blueprint = Blueprint('animal', __name__)

# 1. Get all animals (ADMIN/USER)
@animal_blueprint.route("/", methods=["GET"])
def get_all_animals():
    animals = Animal.query.all()
    return jsonify([{
        "animal_id": a.animal_id,
        "shelter_id": a.shelter_id,
        "birthdate": a.birthdate.isoformat() if a.birthdate else None,
        "gender": a.gender,
        "special_needs": a.special_needs,
        "is_fixed": a.is_fixed,
        "is_vaccinated": a.is_vaccinated,
        "is_adopted": a.is_adopted,
        "img_url": a.img_url,
        "species": a.species
    } for a in animals])

# 2. Get all available animals (ADMIN/USER)
@animal_blueprint.route("/available", methods=["GET"])
def get_available_animals():
    animals = Animal.query.filter_by(is_adopted=False).all()
    return jsonify([{
        "animal_id": a.animal_id,
        "shelter_id": a.shelter_id,
        "birthdate": a.birthdate.isoformat() if a.birthdate else None,
        "gender": a.gender,
        "special_needs": a.special_needs,
        "is_fixed": a.is_fixed,
        "is_vaccinated": a.is_vaccinated,
        "is_adopted": a.is_adopted,
        "img_url": a.img_url,
        "species": a.species
    } for a in animals])

# 3. Add a new animal (ADMIN)
@animal_blueprint.route("/", methods=["POST"])
def add_animal():
    data = request.get_json()
    new_animal = Animal(
        shelter_id=data['shelter_id'],
        name=data['name'],
        birthdate=data['birthdate'],
        species=data['species'],
        gender=data['gender'],
        special_needs=data['special_needs'],
        is_fixed=data['is_fixed'],
        is_vaccinated=data['is_vaccinated'],
        is_adopted=data.get('is_adopted', False),
        img_url=data['img_url']
    )
    db.session.add(new_animal)
    db.session.commit()
    return jsonify({"message": "Animal added successfully", "animal_id": new_animal.animal_id}), 201

# 4. Get animals from shelter name (ADMIN/USER)
@animal_blueprint.route("/shelter/<string:shelter_name>", methods=["GET"])
def get_animals_by_shelter(shelter_name):
    animals = db.session.query(Animal).join(Shelter).filter(Shelter.shelter_name == shelter_name).all()
    return jsonify([{
        "animal_id": a.animal_id,
        "shelter_id": a.shelter_id,
        "birthdate": a.birthdate.isoformat() if a.birthdate else None,
        "gender": a.gender,
        "special_needs": a.special_needs,
        "is_fixed": a.is_fixed,
        "is_vaccinated": a.is_vaccinated,
        "is_adopted": a.is_adopted,
        "img_url": a.img_url,
        "species": a.species
    } for a in animals])

# 5. Get animals by species (ADMIN/USER)
@animal_blueprint.route("/species/<string:species>", methods=["GET"])
def get_animals_by_species(species):
    animals = Animal.query.filter_by(species=species).all()
    return jsonify([{
        "animal_id": a.animal_id,
        "shelter_id": a.shelter_id,
        "birthdate": a.birthdate.isoformat() if a.birthdate else None,
        "gender": a.gender,
        "special_needs": a.special_needs,
        "is_fixed": a.is_fixed,
        "is_vaccinated": a.is_vaccinated,
        "is_adopted": a.is_adopted,
        "img_url": a.img_url,
        "species": a.species
    } for a in animals])
