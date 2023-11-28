import express from "express";
import cors from "cors";
import usersRouter from "./usersRouter.js";
const apiRouter = express.Router();
apiRouter.use(express.json());
apiRouter.use(cors());

// ROTTA PER USERS
apiRouter.use("/users", usersRouter);
export default apiRouter;
