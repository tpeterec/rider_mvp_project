// setup dependencies
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
//Initialize env, express and cors
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
//Initialize PG
const { Pool } = require("pg");
const port = process.env.PORT || 3000;
const connectionString = process.env.STRING;
const pool = new Pool({ connectionString: connectionString });

// API Routes
// Get all motorcycle profiles
app.get("/api/rider_app", (req, res) => {
  pool
    .query("SELECT * FROM rider_profiles")
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

// Gets a select rider profile
app.get("/api/rider_app/:id", (req, res) => {
  pool
    .query(`SELECT * FROM rider_profiles where id = $1`, [req.params.id])
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send("Cant find the rider you're looking for");
      } else {
        res.send(result.rows);
      }
    });
});

// Creates a rider profile
app.post("/api/rider_app", (req, res) => {
  pool
    .query(
      `INSERT INTO rider_profiles (name, age, motorcycle_brand, motorcycle_size, riding_style, image_path, biography) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        req.body.name,
        req.body.age,
        req.body.motorcycle_brand,
        req.body.motorcycle_size,
        req.body.riding_style,
        req.body.image_path,
        req.body.biography,
      ]
    )
    .then((result) => {
      res.send(result.rows);
    });
});

// Update the Rider Information
app.patch("/api/rider_app/:id", (req, res) => {
  let data = req.body;
  console.log(data);
  const query = `UPDATE rider_profiles SET name = COALESCE($1, name), age = COALESCE($2, age), motorcycle_brand = COALESCE($3, motorcycle_brand), motorcycle_size = COALESCE($4, motorcycle_size), 
  riding_style = COALESCE($5, riding_style), biography = COALESCE($6, biography) WHERE id = $7 RETURNING *`;
  const values = [
    data.name || null,
    data.age || null,
    data.motorcycle_brand || null,
    data.motorcycle_size || null,
    data.riding_style || null,
    data.biography || null,
    req.params.id || null,
  ]; //if value exists, add value to array if not set null

  pool.query(query, values).then((result) => {
    if (result.rows.length === 0) {
      res.send("Rider information not found");
    } else {
      res.send(result.rows[0]);
    }
  });
});

// Deletes the rider profile
app.delete("/api/rider_app/:id", (req, res) => {
  pool
    .query(`DELETE FROM rider_profiles WHERE id = $1 RETURNING *`, [
      req.params.id,
    ])
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send("Rider profile not found");
      } else {
        res.send(result.rows);
      }
    });
});

// Listening on port
app.listen(port, () => {
  console.log(`Server listening on port ${port} `);
});
