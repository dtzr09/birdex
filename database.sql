CREATE TABLE speciesdata(
	id INT GENERATED ALWAYS AS IDENTITY (START WITH 21 INCREMENT BY 1),
	name VARCHAR NOT NULL,
	description TEXT,
  img TEXT 
);

CREATE EXTENSION "uuid-ossp";

CREATE TABLE birdsdata(
	id uuid DEFAULT uuid_generate_v4 () NOT NULL,
	name VARCHAR NOT NULL,
	species VARCHAR NOT NULL,
	img VARCHAR NOT NULL,
	created_at TEXT NOT NULL,
	species_id INT NOT NULL
);

ALTER TABLE birdsdata ADD UNIQUE (id);

CREATE TABLE entries(
	entry_id SERIAL PRIMARY KEY,
	bird_name VARCHAR NOT NULL,
  species_id INT NOT NULL,
	species_name VARCHAR NOT NULL,
  weight DOUBLE PRECISION,
	created_at TEXT NOT NULL,
	bird_id uuid
);

ALTER TABLE entries ADD FOREIGN KEY (bird_id) REFERENCES birdsdata(id) ON DELETE CASCADE;

\COPY speciesdata FROM '/Users/dtzr/Documents/GitHub/birdex/client/speciesdata.csv' CSV HEADER; 