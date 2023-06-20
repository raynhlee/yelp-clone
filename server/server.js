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
    data: {
      restaurant: [],
    },
  });
});

app.listen(port, () => {
  console.log(`server is up, listening on port ${port}`);
});
