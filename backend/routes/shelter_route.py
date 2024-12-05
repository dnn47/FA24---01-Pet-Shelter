from flask import Blueprint, jsonify
from models import Shelter

shelter_blueprint = Blueprint('shelter', __name__)


@shelter_blueprint.route("/<int:shelter_id>", methods=["GET"])
def get_shelter_by_id(shelter_id):
    shelter = Shelter.query.get(shelter_id)
    if shelter:
        # Convert the shelter object to a dictionary
        return jsonify({
            "shelter_id": shelter.shelter_id,
            "shelter_name": shelter.shelter_name,
            "location": shelter.location,
            "phone_number": shelter.phone_number,
            "rating": shelter.rating,
            "contact": shelter.contact
        }), 200
    else:
        return jsonify({"error": "Shelter not found"}), 404
