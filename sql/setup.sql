-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS fruits;
DROP TABLE IF EXISTS watches;
DROP TABLE IF EXISTS beers;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS fish;

CREATE TABLE fruits (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    origin VARCHAR NOT NULL,
    benefits VARCHAR NOT NULL
);

CREATE TABLE watches (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    manufacturer VARCHAR NOT NULL,
    origin VARCHAR NOT NULL,
    price VARCHAR NOT NULL
);

CREATE TABLE beers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type VARCHAR NOT NULL,
    color VARCHAR NOT NULL,
    abv VARCHAR NOT NULL
);

CREATE TABLE cars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    manufacturer VARCHAR NOT NULL,
    origin VARCHAR NOT NULL,
    price VARCHAR NOT NULL
);

CREATE TABLE fish (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    origin VARCHAR NOT NULL,
    lifespan VARCHAR NOT NULL
);

INSERT INTO fruits (
    name,
    origin,
    benefits
)
VALUES
    ('Mango', 'India', 'Consumption of Mangos can lead to lower blood pressure, a regular pulse and a stable digestive system'),
    ('Banana', 'Oceania', 'Consumption of bananas can lead to weight loss, digestive health support, improve blood sugar levels and improve heart health' ),
    ('Watermelon', 'Northeastern Africa', 'Consumption of watermelon can lead to hydraton, improved heart health, reduced inflamation and reduced oxidative stress'),
    ('Apple', 'Kazakhstan', 'Consumption of apples can lead to a lower risk of chronic conditions, such as, diabetes, heart disease and cancer');

INSERT INTO watches (
    name,
    manufacturer,
    origin,
    price
)
VALUES
    ('Nautilus', 'Patek Philippe', 'Geneva, Switzerland', '$35,000'),
    ('Daytona', 'Rolex', 'Geneva, Switzerland', '$13,150'),
    ('Seamaster', 'Omega', 'La Chaux-de-Fonds, Switzerland', '$6,000'),
    ('RM 008 Tourbillon', 'Richard Mille', 'Les Breuleux, Switzerland', '$7,206,000');

INSERT INTO beers (
    type,
    color,
    abv
)
VALUES
    ('Stout', 'Dark Brown', '4%-13% alcohol'),
    ('Lager', 'Gold', '5% alcohol'),
    ('Porter', 'Dark Brown', '5%-13% alcohol'),
    ('IPA', 'Amber and cloudy', '4.5%-7%');

INSERT INTO cars (
    name,
    manufacturer,
    origin,
    price
)
VALUES
    ('Urus', 'Lamborghini', 'Italy', '$230,000'),
    ('Phantom', 'Rolls Roycs', 'United Kingdom', '$460,000'),
    ('Chiron', 'Bugatti', 'Italy', '$3,300,000'),
    ('Toyota', 'Corolla', 'Japan', '$20,000');

INSERT INTO fish (
    name,
    origin,
    lifespan
)
VALUES
    ('Salmon', 'Pacific Northwest', '2-7 years'),
    ('Rainbow Trout', 'North America', '7 years'),
    ('Sturgeon', 'North America', '100 years'),
    ('Greenland Shark', 'Canadian Arctic', '250-500 years');