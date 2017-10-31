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
