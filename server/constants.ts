const APIKey = process.env.API_KEY
/**
 * Base URL for OpenWeatherMap API requests.
 * Includes the API key as a query parameter for authentication.
 */
export const baseUrl =
  `https://api.openweathermap.org/data/2.5/weather?appid=${APIKey}`;

/**
 * Server error messages used in the application.
 * FETCH_FAILED: Shown when fetching data from the API fails.
 * CITY_NOT_FOUND: Shown when the requested city is not found in the API.
 */
export const serverError = {
  FETCH_FAILED: "Fetch data failed",
  CITY_NOT_FOUND: "City not found"
};
