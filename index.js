const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

//SPECIES LEVEL
//getting all species
app.get("/api/species", async (req, res) => {
  try {
    const allspecies = await pool.query(
      "SELECT * FROM speciesdata ORDER BY id ASC"
    );
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(allspecies.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//adding species
//POST
app.post("/species", async (req, res) => {
  try {
    const { name, description, img } = req.body;
    const newSpecies = await pool.query(
      "INSERT INTO speciesdata (name, description, img ) VALUES ($1, $2, $3) RETURNING *",
      [name, description, img]
    );
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(newSpecies.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//getting one species and its respective species members
advance_query = `SELECT 
    s.id AS speciesid,
    s.name AS speciesname, 
    s.description AS speciesdesc,
    s.img AS speciesimg,
    b.id AS birdsid,
    b.name AS birdsname,
    b.species AS birdsspecies,
    b.img AS birdsimg 
  FROM speciesdata AS s 
  LEFT JOIN birdsdata AS b ON s.id = b.species_id 
  WHERE s.name = $1`;

app.get("/species/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const familyId = await pool.query(advance_query, [name]);

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    res.json(familyId.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//deleting species
//DELETE
app.delete("/species/:name", async (req, res) => {
  try {
    const { id } = req.body;
    const deletespecies = await pool.query(
      "DELETE FROM speciesdata WHERE id = $1",
      [id]
    );

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(deletespecies.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//updating species
//PUT
app.put("/species/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { description, img } = req.body;
    const updatespecies = await pool.query(
      "UPDATE speciesdata SET description = $1, img = $2 WHERE name = $3",
      [description, img, name]
    );

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    res.json(updatespecies);
  } catch (err) {
    console.log(err.message);
  }
});

//BIRDS LEVEL

//ALTER TABLE birdsdata ALTER COLUMN id DROP IDENTITY, ALTER COLUMN id TYPE uuid USING (uuid_generate_v4()), ALTER COLUMN id SET DEFAULT uuid_generate_v4() --> TO CREATE UNIQUE ID

//Getting one bird details --> Used for data analysis too
advance_query3 = `SELECT 
                  e.entry_id AS entry_id,
                  e.created_at,
                  e.bird_name,
                  b.id AS bird_id,
                  e.species_name,
                  e.weight,
                  b.img AS bird_image
                  FROM entries AS e
                  LEFT JOIN birdsdata AS b on e.bird_name = b.name and e.bird_id = b.id  
                  WHERE e.bird_name = $1 and b.id = $2`;
app.get("/birds/:name/:id", async (req, res) => {
  try {
    const birdsdata = await pool.query(advance_query3, [
      req.params.name,
      req.params.id,
    ]);

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    res.json(birdsdata.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Fetching individual bird entries base on name and species
app.get("/birds/:name/:id/:species_name/entries", async (req, res) => {
  try {
    const { name, species_name } = req.params;
    const birdEntries = await pool.query(
      "SELECT * FROM entries WHERE bird_name = $1 AND species_name = $2 ORDER BY created_at DESC",
      [name, species_name]
    );

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    res.json(birdEntries.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Adding new bird
// This query will insert values into the birdsdata and the entries table
// So once a new bird is added, there must be a weight tag to it
add_bird_query = `WITH ins AS (
                  INSERT INTO birdsdata (name, species, img, created_at, species_id)
                  VALUES ($1, $2, $3, $4, $5)
                  RETURNING id, name, species, created_at , species_id
                  )
                  INSERT INTO entries (bird_name, species_id, species_name, weight, created_at, bird_id)
                  SELECT name, species_id, species, $6, created_at, id
                  FROM ins;
                `;
app.post("/species/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { bird_name, img, created_at, species_id, weight } = req.body;
    const newbird = await pool.query(add_bird_query, [
      bird_name,
      name,
      img,
      created_at,
      species_id,
      weight,
    ]);

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    res.json(newbird.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete bird from birdsdata and the entries thats specific to that bird
// This is done using ON DELETE CASCADE
// ALTER TABLE entries ADD FOREIGN KEY (bird_id) REFERENCES birdsdata(id) ON DELETE CASCADE;
// This allows me to delete all entries when i delete the bird itself base on the uuid

delete_bird_query = "DELETE FROM birdsdata where id = $1";
app.delete("/birds/:name/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletebird = await pool.query(delete_bird_query, [id]);
    res.json(deletebird.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Adding new entries
advance_query2 = `INSERT INTO entries (bird_name, species_id, species_name, weight, created_at, bird_id)\
  SELECT  
    $1,
    (SELECT species_id FROM birdsdata WHERE species = $2 LIMIT 1),
    $3,
    $4,
    $5,
    $6
`;
app.post("/birds/:name/:id/:species_name/entries", async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const { name, species_name, id } = req.params;
    const { weight, created_at } = req.body;
    const newSpecies = await pool.query(advance_query2, [
      name,
      species_name,
      species_name,
      weight,
      created_at,
      id,
    ]);

    res.json(newSpecies.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Deleting entries
app.delete("/birds/:name/:id/:species_name/entries", async (req, res) => {
  try {
    const deleteEntry = await pool.query(
      "DELETE FROM entries WHERE bird_name = $1 AND species_name = $2 AND entry_id = $3",
      [req.params.name, req.params.species_name, req.body.entry_id]
    );
    res.json(deleteEntry.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//updating species
//PUT
app.put("/birds/:name/:id/:species_name/entries", async (req, res) => {
  try {
    const updatespecies = await pool.query(
      "UPDATE entries SET weight = $1, created_at = $2 WHERE entry_id= $3",
      [req.body.weight, req.body.created_at, req.body.id]
    );
    res.json(updatespecies);
  } catch (err) {
    console.log(err.message);
  }
});

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
