const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");

// Connect to databasee
mongoose.set("strictQuery", false);
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
  console.info("Connected to database ");
});
mongoose.connection.on("error", (err) => {
  console.info("Database error: " + err);
});

const app = express();
const port = process.env.PORT || 8080;

// Cors middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Use API routes
let router = express.Router();
app.use("/api", router);
require("./routes/api/home")(router);
require("./routes/api/user")(router);

// Start server
const server = app.listen(port, () => {
  console.info("Server started on port " + port);
});
