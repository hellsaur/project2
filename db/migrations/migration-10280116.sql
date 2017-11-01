-- \c sh_locations
DROP TABLE IF EXISTS locations;
CREATE TABLE IF NOT EXISTS locations
(id SERIAL PRIMARY KEY,
city TEXT,
country TEXT,
name TEXT UNIQUE,
description TEXT,
thumbnail TEXT
);


DROP TABLE IF EXISTS superheroes;
CREATE TABLE IF NOT EXISTS superheroes
(id SERIAL PRIMARY KEY,
name TEXT UNIQUE,
description TEXT,
thumbnail TEXT,
locations_id INTEGER REFERENCES locations(id)
);
