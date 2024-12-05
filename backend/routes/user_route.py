from flask import Blueprint, jsonify, request
from models import User, db

user_blueprint = Blueprint('user', __name__)


@user_blueprint.route('/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.filter_by(user_id=user_id).first()
    if user:
        return jsonify({
            "user_id": user.user_id,
            "email": user.email,
            "age": user.age,
            "address": user.address,
            "phone_number": user.phone_number,
            "gender": user.gender,
            "last_name": user.last_name,
            "first_name": user.first_name
        }), 200
    else:
        return jsonify({"error": "User not found"}), 404


@user_blueprint.route('/all', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([
        {
            "user_id": user.user_id,
            "email": user.email,
            "age": user.age,
            "address": user.address,
            "phone_number": user.phone_number,
            "gender": user.gender,
            "last_name": user.last_name,
            "first_name": user.first_name
        } for user in users
    ]), 200


@user_blueprint.route('/<int:user_id>', methods=['PUT'])
def edit_user_profile(user_id):
    data = request.json  # Get the JSON payload from the request
    user = User.query.filter_by(user_id=user_id).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Allow updates to any field dynamically
    allowed_fields = {"email", "age", "address",
                      "phone_number", "gender", "last_name", "first_name"}
    updated_fields = {}

    for field in allowed_fields:
        if field in data:
            setattr(user, field, data[field])
            updated_fields[field] = data[field]

    if updated_fields:
        db.session.commit()
        return jsonify({
            "message": "User profile updated successfully",
            "updated_fields": updated_fields
        }), 200
    else:
        return jsonify({"error": "No valid fields provided for update"}), 400


@user_blueprint.route('/<int:user_id>', methods=['DELETE'])
def remove_user(user_id):
    user = User.query.filter_by(user_id=user_id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User removed successfully"}), 200
    else:
        return jsonify({"error": "User not found"}), 404
