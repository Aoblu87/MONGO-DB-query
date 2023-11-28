import express from "express";
import { User } from "../models/users.js";
import { genericError } from "../middlewares/genericError.js";

const usersRouter = express.Router();

// TEST
usersRouter.get("/test", async (req, res) => {
  res.json({ message: "Users router working! 🚀" });
});

// GET tutti gli autori
usersRouter
  .get("/", async (req, res, next) => {
    try {
      const users = await User.find({});
      if (!users) {
        return res.status(404).send();
      }
      res.json(users);
    } catch (error) {
      next(genericError(error));
    }
  })
  // QUERY
  // 1) tutte le risorse con il dato isActive = True
  .get("/get", async (req, res, next) => {
    try {
      const isActive = await User.find({
        isActive: true,
      });
      if (!isActive) {
        return res.status(404).send();
      }
      res.json(isActive);
    } catch (error) {
      next(error);
    }
  })
  // 2) tutte le risorse con il dato age maggiore di 26
  .get("/get", async (req, res, next) => {
    try {
      const age = await User.find({
        age: { $gt: 26 },
      });
      if (!age) {
        return res.status(404).send();
      }
      res.json(age);
    } catch (error) {
      next(error);
    }
  });

export default usersRouter;
