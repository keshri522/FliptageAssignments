
 # TechStack
 - Node.js
 - mongDb
 - EXPRESS
 - DOTENV
 - bodyParser
 - fetch

- - Routes
The following routes are available:

- GET /locations: Retrieve all locations.
- GET /locations/:location_id: Retrieve a location by ID.
- POST /locations: Add a new location.
- PUT /locations/:location_id: Update a location.
- DELETE /locations/:location_id: Delete a location.
- GET /weather/:location_id: Get real-time weather details for a location.
- Environment Variables
- PORT: Port on which the server will run.
- MONGODB_URI: MongoDB connection URI.
- OPENWEATHER_API_KEY: API key for the OpenWeather API.
- API Endpoints
- GET /locations

# Returns a list of all locations.
 - GET /locations/:location_id

# Returns details for a specific location.
 - POST /locations

# Adds a new location. Requires a JSON body with location details.
- PUT /locations/:location_id

# Updates details for a specific location. Requires a JSON body with updated location details.
- DELETE /locations/:location_id

# Deletes a specific location.
- GET /weather/:location_id

# Retrieves real-time weather details for a specific location.
- Weather API Integration
  
# This project integrates with the OpenWeather API to provide real-time weather data. Make sure to obtain an API key and set it in the .env file.

- git clone https://github.com/your-username/your-repo.git
  # bash
  - npm install
  #env
- PORT=3000
- MONGODB_URI=mongodb://localhost:27017/your-database
- OPENWEATHER_API_KEY=your-openweather-api-key




Contributing
Feel free to contribute by forking the repository and creating a pull request.

License
This project is licensed under the MIT License.
