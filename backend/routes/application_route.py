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
        "form_id": a.form_id,
        "user_id": a.user_id,
        "animal_id": a.animal_id,
        "status": a.status,
        "submit_date": a.submit_date.isoformat() if a.submit_date else None,
        "review_date": a.review_date.isoformat() if a.review_date else None
    } for a in applications])

# 2. Submit an application (USER)
@application_blueprint.route("", methods=["POST"])
def submit_application():
    data = request.get_json()

    required_fields = ["form_id", "user_id", "animal_id"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    new_application = Application(
        form_id=data["form_id"],
        user_id=data["user_id"],
        animal_id=data["animal_id"],
        status="Pending", 
        submit_date=datetime.utcnow().date(), 
        review_date=None 
    )

    db.session.add(new_application)
    db.session.commit()

    return jsonify({"message": "Application submitted successfully"}), 200

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
