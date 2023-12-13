// this is the controllers methods for defining all the functions that can be access with the routes

// this is the post route for posting or adding the new city
const Weather = require("../Model/weatherData"); // this is the weather Model schema
const Data = require("../Model/data");
const addLocation = async (req, res) => {
  const name = req.body.name;
  const longitude = req.body.longitude;
  const lattitude = req.body.lattitude;
  console.log(name, longitude, lattitude);
  try {
    // first need to validate the all the fields if it is properly coming from the clent side or not
    if (!name || !longitude || !lattitude) {
      return res.status(400).json({
        error: "Please enter name ,latitude ,longitude fields in body",
      });
    }
    // we need to save that data to the data collections
    const newData = new Data({
      name: name,
      longitude: longitude,
      lattitude: lattitude,
    });
    // saving this
    await newData.save();
    res.status(200).send(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// for the get api will return all the data present in the database
const getAllLocations = async (req, res) => {
  try {
    const data = await Data.find({});
    if (data.length > 0) {
      return res.status(200).json({ data: data });
    } else {
      return res.status(400).json({
        data: "No Data found",
      });
    }
  } catch (error) {
    console.log(error); // just for debugging
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
// this api will return the one location based on the locationId
const getLocationById = async (req, res) => {
  try {
    const id = req.params.location_id; // taking the id in query because this is get request
    // for extra validation if user enter wrong id then
    if (id.length > 24 || id.length < 24) {
      return res.status(404).json({
        error: "Invalid Location Id",
      });
    }
    const locationData = await Data.findById(id);

    if (!locationData) {
      return res.status(404).json({ message: "Location not found" });
    }

    return res.status(200).json(locationData);
  } catch (error) {
    // console.error("Error fetching location by ID:", error); // just for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// this api will delete the location based on the id
const deleteLocation = async (req, res) => {
  try {
    const id = req.params.location_id;
    // Extra validation if the user enters an invalid ID
    if (id.length !== 24) {
      return res.status(400).json({
        error: "Invalid Location ID",
      });
    }
    // finding the id in the Collection Data
    const deletedLocation = await Data.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    return res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// this api will update the location based on the id,name,lattitude and longitue
const updateLocation = async (req, res) => {
  try {
    const id = req.params.location_id; // getting the id  in params
    // Extra validation if the user enters an invalid ID
    if (id.length !== 24) {
      return res.status(400).json({
        error: "Invalid Location ID",
      });
    }

    // Extracting data from the request body
    const name = req.body.name;
    const longitude = req.body.longitude;
    const lattitude = req.body.lattitude;

    // Validating if the required fields are present
    if (!name || !longitude || !lattitude) {
      return res.status(400).json({
        error: "Missing required fields in body (name, longitude, latitude)",
      });
    }
    // once done we need to update with id
    const updatedLocation = await Data.findByIdAndUpdate(
      id,
      { name, longitude, lattitude },
      { new: true } // this will return the latest docuemnt once updated
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    return res.status(200).json(updatedLocation);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// this api will return the weather deatials of based on the particualr id

const getWeatherdeatials = async (req, res) => {
  // destructing the ciryname from body
  const id = req.params.location_id;
  // first need to check the id is present in the Data collection or not

  try {
    // if id is wrong then
    if (id.length !== 24) {
      return res.status(400).json({
        error: "Invalid Location ID",
      });
    }
    const checkid = await Data.findOne({ _id: id }); // it will return me the whole data of the id i can use name and make thev thrid party call api to get all the information of the current location
    // Implement caching mechanisms to reduce the number of external API calls. i can first check in the My Weather schema if the City name is there then simly retrun from the Schema ootherwise need to call external api
    if (checkid) {
      // need to firtst chekc the data in my weather collection to aviod uncessary api external calls
      let finddata = await Weather.findOne({ name: checkid.name });
      if (finddata) {
        // console.log(finddata); // for debugging
        return res.status(200).json({ data: finddata });
      }
      // if not present then call the openweather api call
      else {
        const openWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${checkid.name}&appid=${process.env.WeatherApi_Key}&units=metric`;
        if (openWeatherApi) {
          //   console.log("called");
        }
        const apiResponse = await fetch(openWeatherApi, {
          method: "GET",
        });
        const result = await apiResponse.json();
        // saving into the database

        // console.log(result); // just for debugging
        const latitude = result.coord.lat;
        const longitude = result.coord.lon;
        const temperature = result.main.temp;
        const humidity = result.main.humidity;
        const visibility = result.visibility;
        const windSpeed = result.wind.speed;
        const sunrise = result.sys.sunrise;
        const sunset = result.sys.sunset;
        const name = result.name;

        const weatherEntry = new Weather({
          temperature,
          humidity,
          windSpeed,
          latitude,
          longitude,
          visibility,
          sunset,
          sunrise,
          name,
        });

        await weatherEntry.save(); // saving to the databse
        //sending the response to the cleint
        res.status(200).json({ data: weatherEntry });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = {
  addLocation,
  getAllLocations,
  getLocationById,
  deleteLocation,
  updateLocation,
  getWeatherdeatials,
};
