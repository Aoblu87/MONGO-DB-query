import express from "express";
import mongoose from "mongoose";
import apiRouter from "./apiRouter.js";
import { genericError } from "./middlewares/genericError.js";

const server = express();
const port = 3020;

server.use("/api", apiRouter);
server.use(genericError);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(port, () => {
      console.log("Server listening to port: " + port);
    });
  })
  .catch(() => {
    console.log("Errore nella connessione al DB");
  });
