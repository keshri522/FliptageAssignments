const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const DatabaseConnection = require("./DatabaseConnection/config");
// importing the routers
const router = require("../Backend/routes/router");
// Middleware to parse JSON requests
// calling the connections
DatabaseConnection();

app.use(express.json());
app.use(morgan("tiny")); // shows all the logs as mentioned
app.use("", router); // this router will access with the  given endpoint
app.use(bodyParser.urlencoded({ extended: true })); // to parse the data coming from cleint side

app.use(cors()); // allow to access at any origin

const port = 4000;
// Start the server with the port
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
