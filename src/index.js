const express = require("express");
require("dotenv").config();
require("./configs/dbconfig");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const errorMiddleware = require("./middlewares/errorHandler");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(bodyParser.json()); // Parse JSON request bodies

const port = process.env.APPLICATION_PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api", routes);
app.use(errorMiddleware.errorHandler);

module.exports = app;
