require("dotenv").config();

const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 3001;

app.get("/api/v1/restaurants", async (req, res) => {
  const results = await db.query(`
  select * from restaurants
  `);
  res.status(200).json({
    status: "success",
    results: results.rows.length,
    data: {
      restaurants: results.rows,
    },
  });
});

app.get("api/v1/resaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      `
    select * from restaurants
    where id=$1
    `,
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      `
    INSERT INTO restaurants (name, location, price_range)
    values ($1, $2, $3)
    returning *
    `,
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server is up, listening on port ${port}`);
});
