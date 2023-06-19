require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up, listening on port ${port}`);
});
