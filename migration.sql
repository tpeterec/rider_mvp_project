DROP TABLE IF EXISTS rider_profiles;

CREATE TABLE rider_profiles(
    id SERIAL PRIMARY KEY,
    name varchar,
    age integer,
    motorcycle_brand varchar,
    motorcycle_size integer,
    riding_style text,
    biography text
);