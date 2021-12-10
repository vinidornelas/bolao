import * as express from "express";
import * as cors from "cors";
import { json } from "body-parser";
import * as morgan from "morgan";
import { NextFunction, Request, Response } from "express";
import { errors } from "celebrate";
import AppError from "../@types/errors/AppError";

const createMiddlewares = (app: express.Express) => {
  app.use(cors());
  app.use(json({ limit: "5mb" }));
  app.use(morgan("dev"));

  app.use(errors());
  app.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }

      console.log(error);

      return response.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  );
};

export const errorMiddlewares = (app: express.Express) => {
  app.use((req: express.Request, res: express.Response) => {
    res.status(404).send('rota nao encontrada');
  });
  
  app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errorMessage = error.message;
  
    console.log(errorMessage);
    const response = process.env.NODE_ENV === 'development' ?
      errorMessage :
      'erro inesperado. Consulte o admin.'
    ;
  
    res.status(500).send({response});
  });
};


export default createMiddlewares;
