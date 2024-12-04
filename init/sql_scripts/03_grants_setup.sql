\c pet_shelter
CREATE ROLE pet_shelter_admin WITH LOGIN PASSWORD 'admin';
CREATE ROLE pet_shelter WITH LOGIN PASSWORD 'pet_shelter';

-- Grant full access to admin user (pet_shelter_admin)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO pet_shelter_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO pet_shelter_admin;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO pet_shelter_admin;

-- Grant permissions to regular user (pet_shelter)
GRANT SELECT, INSERT ON application TO pet_shelter;
GRANT SELECT ON animal TO pet_shelter;
GRANT SELECT ON shelter TO pet_shelter;
GRANT SELECT, UPDATE ON users TO pet_shelter;
