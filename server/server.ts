import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { join } from "path";
import { fileURLToPath } from "url";
import { baseUrl, serverError } from "./constants.ts";

// Resolve the directory name for static files
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const clientFolder = "../client";
const appPath = join(__dirname, clientFolder);

export default class Server {
  app: Application; // The Express application instance
  port: number; // Port number where the server will run

  /**
   * Constructor to initialize the server with the specified port.
   * @param {string} port - The port number as a string.
   */
  constructor(port: string) {
    this.app = express();
    this.port = parseInt(port);
    this.middlewares();
    this.routes();
  }

  /**
   * Configure middleware for the server.
   * - Enables CORS with any origin.
   * - Parses incoming JSON requests.
   */
  middlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
  }

  /**
   * Define the server routes.
   * - Health check route at `/api/health`.
   * - Serves static files from the client folder.
   */
  routes() {
    // Health check route
    this.app.get("/api/health", (_req: Request, res: Response) => {
      res.status(200).json({
        status: "ok",
      });
    });

    // Fetch weather data from OpenWeatherMap using city name
    this.app.get("/api/weather/name", async (_req: Request, res: Response) => {
      const { query } = _req;
      const name = query.q; // City name from query parameter
      const unit = query.unit || "metric"; // Temperature unit (default is "metric")
      const lang = query.lang || "en"; // Language code (default is "en")

      if (!name) {
        res.status(401).json({ message: serverError.CITY_NOT_FOUND }); // Return error if no city name is provided
      }

      try {
        // Fetch weather data from OpenWeatherMap API using the city name
        const response = await fetch(
          `${baseUrl}&q=${name}&units=${unit}&lang=${lang}`
        );
        const data = await response.json(); // Parse JSON data from the API response
        data.unit = unit; // Attach unit of measurement to the data

        res.status(response.status).json(data); // Send weather data back with the status code
      } catch (err) {
        res.status(401).json({ message: serverError.FETCH_FAILED }); // Handle fetch errors
      }
    });

    // Fetch weather data from OpenWeatherMap using coordinates (latitude and longitude)
    this.app.get("/api/weather/coord", async (_req: Request, res: Response) => {
      const { query } = _req;
      const lat = query.lat; // Latitude from query parameter
      const lon = query.lon; // Longitude from query parameter
      const unit = query.unit || "metric"; // Temperature unit (default is "metric")
      const lang = query.lang || "en"; // Language code (default is "en")

      if (!lat || !lon) {
        res.status(401).json({ message: serverError.CITY_NOT_FOUND }); // Return error if no coordinates are provided
      }

      try {
        // Fetch weather data from OpenWeatherMap API using latitude and longitude
        const response = await fetch(
          `${baseUrl}&lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}`
        );
        const data = await response.json(); // Parse JSON data from the API response
        data.unit = unit; // Attach unit of measurement to the data

        res.status(response.status).json(data); // Send weather data back with the status code
      } catch (err) {
        res.status(401).json({ message: serverError.FETCH_FAILED }); // Handle fetch errors
      }
    });

    // Serve static files from the client folder
    this.app.use("/", express.static(appPath));
  }

  /**
   * Start the server and listen on the specified port.
   */
  listen() {
    this.app.listen(this.port, () => {
      console.log("TVO Server is running on port: ", this.port);
    });
  }
}
