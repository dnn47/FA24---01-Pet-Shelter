from flask import Blueprint, jsonify, request
from models import Application, Form, db
from datetime import datetime

application_blueprint = Blueprint('application', __name__)

# 1. Get all adoption applications (ADMIN)
@application_blueprint.route("/", methods=["GET"])
def get_all_applications():
    applications = Application.query.all()
    return jsonify([{
        "application_id": a.application_id,
        "user_id": a.user_id,
        "animal_id": a.animal_id,
        "status": a.status,
        "submit_date": a.submit_date.isoformat() if a.submit_date else None,
        "review_date": a.review_date.isoformat() if a.review_date else None,
        "form": {
            "home_type": f.home_type,
            "net_income": f.net_income,
            "household_num": f.household_num,
            "credit_score": f.credit_score,
            "is_allergic": f.is_allergic,
            "landlord_contact": f.landlord_contact,
            "preexisting_pets": f.preexisting_pets
        } if (f := a.form) else None
    } for a in applications])

# 2. Submit an application form (USER)
@application_blueprint.route("/", methods=["POST"])
def submit_application():
    data = request.get_json()

    # Validate required fields
    required_fields = ["user_id", "animal_id", "home_type", "net_income", "household_num", "credit_score", "preexisting_pets"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    new_application = Application(
        user_id=data["user_id"],
        animal_id=data["animal_id"],
        status="Pending",
        submit_date=datetime.utcnow(),
        review_date=None
    )
    db.session.add(new_application)
    db.session.flush()  # Flush to get the generated application_id
    
    new_form = Form(
        application_id=new_application.application_id,
        home_type=data["home_type"],
        net_income=data["net_income"],
        household_num=data["household_num"],
        credit_score=data["credit_score"],
        is_allergic=data.get("is_allergic", False),
        landlord_contact=data.get("landlord_contact"),  # Optional field
        preexisting_pets=data["preexisting_pets"]
    )
    db.session.add(new_form)
    db.session.commit()
    
    return jsonify({"message": "Application submitted successfully", "application_id": new_application.application_id}), 201

# 3. Get applications by user ID (ADMIN/USER)
@application_blueprint.route("/user/<int:user_id>", methods=["GET"])
def get_applications_by_user(user_id):
    applications = Application.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "application_id": a.application_id,
        "user_id": a.user_id,
        "animal_id": a.animal_id,
        "status": a.status,
        "submit_date": a.submit_date.isoformat() if a.submit_date else None,
        "review_date": a.review_date.isoformat() if a.review_date else None,
        "form": {
            "home_type": f.home_type,
            "net_income": f.net_income,
            "household_num": f.household_num,
            "credit_score": f.credit_score,
            "is_allergic": f.is_allergic,
            "landlord_contact": f.landlord_contact,
            "preexisting_pets": f.preexisting_pets
        } if (f := a.form) else None
    } for a in applications])

# 4. Review an application (ADMIN)
@application_blueprint.route("/<int:application_id>/review", methods=["PUT"])
def review_application(application_id):
    data = request.get_json()
    status = data.get("status")
    
    if status not in ["Approved", "Rejected"]:
        return jsonify({"error": "Invalid status. Must be 'Approved' or 'Rejected'."}), 400
    
    application = Application.query.filter_by(application_id=application_id).first()
    if not application:
        return jsonify({"error": "Application not found"}), 404
    
    application.status = status
    application.review_date = datetime.utcnow()
    db.session.commit()
    
    return jsonify({"message": "Application reviewed successfully", "application_id": application_id, "status": status}), 200
