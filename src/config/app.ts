import * as express from "express";
import createRouters from "../routers";
import createMiddlewares, { errorMiddlewares } from "./middlewares";

const createApp = (): express.Express => {
  const app = express();
  createMiddlewares(app);
  createRouters(app);
  errorMiddlewares(app);
  return app;
};

export default createApp;
