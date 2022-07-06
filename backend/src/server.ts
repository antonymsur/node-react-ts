import express, { Express } from 'express';

import morgan from "morgan";

const bodyParser = require("body-parser");
const cors = require("cors");


export default async function createServer(): Promise<Express> { 
  const app = express();
  var corsOptions = {
    //origin: "http://localhost:8081"
    origin: '*'
  };
  app.use(cors(corsOptions));
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  app.use(
    morgan(":method :url :status :response-time ms - :res[content-length]")
  );
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  /** Logging */
  app.use(morgan("dev"));

  // simple route
  app.get("/", (req: any, res: { json: (arg0: { message: string; }) => void; }) => {
    res.json({ message: "Welcome to my application." });
  });
  
  const routes = require("./app/routes/address.routes");
  app.use('/api/address', routes);
  
  return app;
}
