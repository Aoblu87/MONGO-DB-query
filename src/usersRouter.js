import express from "express";
import { User } from "../models/users.js";
const usersRouter = express.Router();

// TEST
usersRouter.get("/test", async (req, res) => {
  res.json({ message: "Users router working! 🚀" });
});

// GET tutti gli autori
usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).send();
    }
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(505).send(error);
  }
});
export default usersRouter;
