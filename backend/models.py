from db import db

class Shelter(db.Model):
    __tablename__ = 'shelter'
    shelter_id = db.Column(db.Integer, primary_key=True)
    shelter_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(20))
    rating = db.Column(db.Float)
    contact = db.Column(db.String(100))

    __table_args__ = (
        db.CheckConstraint('rating >= 0 AND rating <= 5', name='check_rating_range'),
    )

    animals = db.relationship('Animal', back_populates='shelter')

class Animal(db.Model):
    __tablename__ = 'animal'

    animal_id = db.Column(db.Integer, primary_key=True)
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelter.shelter_id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)  # Add this line for the animal name
    birthdate = db.Column(db.Date)
    gender = db.Column(db.String(1))
    special_needs = db.Column(db.Boolean, default=False)
    is_fixed = db.Column(db.Boolean, default=False)
    is_vaccinated = db.Column(db.Boolean, default=False)
    is_adopted = db.Column(db.Boolean, default=False)
    img_url = db.Column(db.String(255))
    species = db.Column(db.String(50))

    shelter = db.relationship('Shelter', back_populates='animals')

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    age = db.Column(db.Integer)
    address = db.Column(db.String(255))
    phone_number = db.Column(db.String(15))
    gender = db.Column(db.String(10))
    last_name = db.Column(db.String(128))
    first_name = db.Column(db.String(128))

    applications = db.relationship('Application', back_populates='user')

    def __repr__(self):
        return f"<User {self.first_name} {self.last_name}>"

class Application(db.Model):
    __tablename__ = 'application'

    application_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.animal_id'), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Pending") 
    submit_date = db.Column(db.Date, nullable=False)
    review_date = db.Column(db.Date, nullable=True)

    form = db.relationship('Form', back_populates='application', uselist=False) 
    animal = db.relationship('Animal', backref='applications')
    user = db.relationship('User', back_populates='applications')

class Form(db.Model):
    __tablename__ = 'form'

    form_id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(db.Integer, db.ForeignKey('application.application_id'), nullable=False)
    home_type = db.Column(db.String(50), nullable=True)  
    net_income = db.Column(db.Integer, nullable=True) 
    household_num = db.Column(db.Integer, nullable=True)  
    credit_score = db.Column(db.Integer, nullable=True)
    is_allergic = db.Column(db.Boolean, nullable=True) 
    landlord_contact = db.Column(db.String(20), nullable=True)  
    preexisting_pets = db.Column(db.Integer, nullable=True) 

    application = db.relationship('Application', back_populates='form')

    def __repr__(self):
        return f"<Form {self.form_id}>"
