// this is the routes of the enitre application
const express = require("express");
const router = express.Router();
const {
  addLocation,
  getAllLocations,
  getLocationById,
  deleteLocation,
  updateLocation,
  getWeatherdeatials,
} = require("../controllers/locations");
router.get("/locations", getAllLocations);
router.get("/locations/:location_id", getLocationById);
router.post("/locations", addLocation);
router.put("/locations/:location_id", updateLocation);
router.delete("/locations/:location_id", deleteLocation);
router.get("/weather/:location_id", getWeatherdeatials);

module.exports = router;
