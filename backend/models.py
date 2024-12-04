from db import db

class Animal(db.Model):
    __tablename__ = 'animal'

    animal_id = db.Column(db.Integer, primary_key=True)
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelter.shelter_id'), nullable=False)
    birthdate = db.Column(db.Date)
    gender = db.Column(db.String(1))
    special_needs = db.Column(db.Boolean, default=False)
    is_fixed = db.Column(db.Boolean, default=False)
    is_vaccinated = db.Column(db.Boolean, default=False)
    is_adopted = db.Column(db.Boolean, default=False)
    img_url = db.Column(db.String(255))
    species = db.Column(db.String(50))

    shelter = db.relationship('Shelter', back_populates='animals')

class Shelter(db.Model):
    __tablename__ = 'shelter'
    shelter_id = db.Column(db.Integer, primary_key=True)
    shelter_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(20))
    rating = db.Column(db.Float)
    contact = db.Column(db.String(100))

    animals = db.relationship('Animal', back_populates='shelter')
