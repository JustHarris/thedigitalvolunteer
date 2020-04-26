/**
 * third party libraries
 */
import { urlencoded, json } from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import mapRoutes from 'express-routes-mapper';
import cors from 'cors';

/**
 * server configuration
 */
import config from '../config/';
import dbService from './services/db.service';

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = Server(app);
const mappedRoutes = mapRoutes(config.routes, 'api/controllers/');
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(urlencoded({ extended: false }));
app.use(json());

// fill routes for express application
app.use('/', mappedRoutes);

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
