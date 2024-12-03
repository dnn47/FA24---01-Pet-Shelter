INSERT INTO Shelter (shelter_name, location, phone_number, rating, contact) VALUES
('Happy Tails Shelter', '123 Main St', '555-123-4567', 4.5, 'contact@happytails.org'),
('Paws Haven', '456 Oak Ave', '555-987-6543', 3.8, 'info@pawshaven.com'),
('Furry Friends Refuge', '789 Maple Dr', '555-321-8765', 4.9, 'support@furryfriends.com'),
('Cozy Paws Shelter', '101 Birch Ln', '555-555-0101', 4.2, 'cozy@pawsshelter.org');

INSERT INTO Animal (shelter_id, name, birthdate, species, gender, special_needs, is_fixed, is_vaccinated, is_adopted, img_url) VALUES
(1, 'Max', '2020-05-15', 'Dog', 'Male', FALSE, TRUE, TRUE, FALSE, 'https://example.com/dog1.jpg'),
(2, 'Whiskers', '2019-11-01', 'Cat', 'Female', TRUE, TRUE, TRUE, TRUE, 'https://example.com/cat1.jpg'),
(1, 'Thumper', '2021-03-20', 'Rabbit', 'Male', FALSE, FALSE, TRUE, FALSE, 'https://example.com/rabbit1.jpg'),
(2, 'Bella', '2022-07-10', 'Dog', 'Female', TRUE, TRUE, TRUE, FALSE, 'https://example.com/dog2.jpg'),
(1, 'Sunny', '2021-09-05', 'Bird', 'Male', FALSE, FALSE, TRUE, FALSE, 'https://example.com/bird1.jpg'),
(3, 'Luna', '2022-01-15', 'Cat', 'Female', TRUE, TRUE, TRUE, FALSE, 'https://example.com/cat2.jpg'),
(4, 'Rocky', '2020-06-10', 'Dog', 'Male', FALSE, TRUE, FALSE, FALSE, 'https://example.com/dog3.jpg'),
(3, 'Shelly', '2021-04-18', 'Turtle', 'Female', FALSE, FALSE, FALSE, FALSE, 'https://example.com/turtle1.jpg'),
(1, 'BunBun', '2018-11-30', 'Rabbit', 'Male', TRUE, TRUE, TRUE, TRUE, 'https://example.com/rabbit2.jpg'),
(4, 'Sadie', '2019-02-14', 'Dog', 'Female', FALSE, TRUE, TRUE, FALSE, 'https://example.com/dog4.jpg'),
(4, 'Milo', '2020-12-12', 'Cat', 'Male', TRUE, FALSE, FALSE, FALSE, 'https://example.com/cat3.jpg'),
(3, 'Polly', '2023-01-22', 'Parrot', 'Female', FALSE, FALSE, TRUE, FALSE, 'https://example.com/parrot1.jpg'),
(2, 'Buddy', '2017-07-05', 'Dog', 'Male', FALSE, TRUE, TRUE, TRUE, 'https://example.com/dog5.jpg'),
(1, 'Ginger', '2022-03-15', 'Guinea Pig', 'Female', FALSE, TRUE, TRUE, FALSE, 'https://example.com/guinea1.jpg'),
(4, 'Cleo', '2021-11-07', 'Cat', 'Female', FALSE, FALSE, TRUE, FALSE, 'https://example.com/cat4.jpg');

INSERT INTO Users (email, age, address, phone_number, gender, last_name, first_name) VALUES
('johndoe@example.com', 28, '101 Elm St', '555-444-1234', 'Male', 'Doe', 'John'),
('janedoe@example.com', 32, '202 Pine St', '555-333-5678', 'Female', 'Doe', 'Jane'),
('alexsmith@example.com', 24, '303 Birch St', '555-222-9012', 'Non-Binary', 'Smith', 'Alex'),
('mikebrown@example.com', 40, '404 Cedar Ct', '555-666-7788', 'Male', 'Brown', 'Mike'),
('sarawhite@example.com', 29, '505 Aspen Pl', '555-777-8899', 'Female', 'White', 'Sara');

INSERT INTO Application (animal_id, user_id, status, submit_date, review_date) VALUES
(1, 1, 'Pending', '2024-11-15', NULL),
(2, 2, 'Approved', '2024-11-10', '2024-11-12'),
(3, 3, 'Rejected', '2024-11-08', '2024-11-10'),
(4, 1, 'Pending', '2024-11-18', NULL),
(5, 4, 'Approved', '2024-11-12', '2024-11-15'),
(6, 5, 'Pending', '2024-11-18', NULL),
(7, 2, 'Rejected', '2024-11-14', '2024-11-16');

INSERT INTO Form (application_id, credit_score, household_num, net_income, home_type, preexisting_pets, landlord_contact, is_allergic) VALUES
(1, 720, 4, 60000.00, 'Apartment', TRUE, 'landlord1@example.com', FALSE),
(2, 650, 2, 45000.00, 'House', FALSE, 'landlord2@example.com', TRUE),
(3, 800, 1, 75000.00, 'Condo', FALSE, NULL, FALSE),
(4, 580, 3, 40000.00, 'Townhouse', TRUE, 'landlord3@example.com', TRUE),
(5, 700, 2, 55000.00, 'House', TRUE, 'landlord4@example.com', FALSE),
(6, 600, 1, 30000.00, 'Apartment', FALSE, NULL, TRUE),
(7, 780, 5, 80000.00, 'Condo', FALSE, 'landlord5@example.com', FALSE);
