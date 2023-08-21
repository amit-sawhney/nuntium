import createError from "http-errors";
import HttpStatus from "http-status-codes";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";

import routes from "./src/routes";
import env from "./config/env";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "2.1mb" }));
app.use(express.urlencoded({ limit: "2.1mb", extended: false }));

if (env.NODE_ENV !== "production") {
  app.use(cors({ origin: /localhost:\d{4}/, credentials: true }));
}

// Routes
app.use("/api", routes);
app.get("/", (_req: Request, res: Response) => res.json("API working!"));

// Handle case when no route is matched
app.use(function (_req: Request, _res: Response, next) {
  next(createError(HttpStatus.NOT_FOUND));
});

module.exports = app;
