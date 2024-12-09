CREATE TABLE Shelter (
    shelter_id SERIAL PRIMARY KEY,
    shelter_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    phone_number VARCHAR(15),
    rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 5),
    contact VARCHAR(100)
);

CREATE TABLE Animal (
    animal_id SERIAL PRIMARY KEY,
    shelter_id INTEGER,
    name VARCHAR(100) NOT NULL, 
    birthdate DATE,
    species VARCHAR(100),
    gender VARCHAR(10),
    special_needs BOOLEAN,
    is_fixed BOOLEAN,
    is_vaccinated BOOLEAN,
    is_adopted BOOLEAN DEFAULT FALSE, 
    img_url VARCHAR(255),
    FOREIGN KEY (shelter_id) REFERENCES Shelter(shelter_id) ON DELETE SET NULL
);

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN,
    age INT,
    address VARCHAR(255),
    phone_number VARCHAR(15),
    gender VARCHAR(10),
    last_name VARCHAR(128),
    first_name VARCHAR(128)
);

CREATE TABLE Form (
    form_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    credit_score INT CHECK (credit_score >= 0 AND credit_score <= 800),
    household_num INT,
    net_income DECIMAL(12, 2),
    home_type VARCHAR(50),
    preexisting_pets BOOLEAN,
    landlord_contact VARCHAR(100),
    is_allergic BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Application (
    application_id SERIAL PRIMARY KEY,
    animal_id INTEGER,
    user_id INTEGER,
    form_id INTEGER,
    status VARCHAR(50),
    submit_date DATE CHECK (submit_date <= CURRENT_DATE),
    review_date DATE CHECK (review_date >= submit_date),
    FOREIGN KEY (animal_id) REFERENCES Animal(animal_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (form_id) REFERENCES Form(form_id)
);
