from flask import Blueprint, jsonify, request
from models import Form, db
from datetime import datetime

form_blueprint = Blueprint('form', __name__)

# 1. Submit a form (USER)
@form_blueprint.route("/newForm", methods=["POST"])
def submit_form():
    data = request.get_json()

    # Validate required fields
    required_fields = ["user_id", "credit_score", "household_num", "net_income", "home_type", "preexisting_pets", "landlord_contact", "is_allergic"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # Check if a form already exists for the user
    existing_form = Form.query.filter_by(user_id=data["user_id"]).first()

    if existing_form:
        existing_form.credit_score = data["credit_score"]
        existing_form.household_num = data["household_num"]
        existing_form.net_income = data["net_income"]
        existing_form.home_type = data["home_type"]
        existing_form.preexisting_pets = data["preexisting_pets"]
        existing_form.landlord_contact = data.get("landlord_contact")  # Optional
        existing_form.is_allergic = data.get("is_allergic", False)

        db.session.commit()

        return jsonify({"message": "Form updated successfully"}), 200
    else:
        # Create a new form
        new_form = Form(
            user_id=data["user_id"],
            credit_score=data["credit_score"],
            household_num=data["household_num"],
            net_income=data["net_income"],
            home_type=data["home_type"],
            preexisting_pets=data["preexisting_pets"],
            landlord_contact=data.get("landlord_contact"), 
            is_allergic=data.get("is_allergic", False)
        )
        db.session.add(new_form)
        db.session.commit()

        return jsonify({"message": "Form submitted successfully"}), 200

# 2. Get form by user ID (USER)
@form_blueprint.route("/user/<int:user_id>", methods=["GET"])
def get_forms_by_user(user_id):
    forms = Form.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "form_id": f.form_id,
        "user_id": f.user_id,
        "credit_score": f.credit_score,
        "household_num": f.household_num,
        "net_income": f.net_income,
        "home_type": f.home_type,
        "preexisting_pets" : f.preexisting_pets,
        "landlord_contact" : f.landlord_contact,
        "is_allergic" : f.is_allergic
    } for f in forms])