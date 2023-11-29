import express from "express";
import { User } from "./models/users.js";
import { genericError } from "./middlewares/genericError.js";

const usersRouter = express.Router();

// TEST
usersRouter.get("/test", async (req, res) => {
  res.json({ message: "Users router working! 🚀" });
});

// GET tutti gli autori
usersRouter
  // .get("/", async (req, res, next) => {
  //   try {
  //     const users = await User.find({});
  //     if (!users) {
  //       return res.status(404).send();
  //     }
  //     res.json(users);
  //   } catch (error) {
  //     next(genericError(error));
  //   }
  // })

  // QUERY
  // 1) tutte le risorse con il dato isActive = True
  .get("/q1", async (req, res, next) => {
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
  .get("/q2", async (req, res, next) => {
    try {
      const { limit, skip, sortBy, order } = req.query;
      const age = await User.find({
        age: { $gt: 26 },
      })
        .sort(
          sortBy && order
            ? {
                [sortBy]: order,
              }
            : undefined
        )
        .skip(skip)
        .limit(limit);

      if (!age) {
        return res.status(404).send();
      }
      res.json(age);
    } catch (error) {
      next(error);
    }
  })

  // QUERY STRING PARAMS
  // http://localhost:3020/api/users/get?filter=age:gt:26
  //http://localhost:3020/api/users/get?filter=age:gt:26&sortBy=age&order=ascending

  // 3) tutte le risorse con il dato age maggiore di 26 e minore e uguale a 30
  .get("/q3", async (req, res, next) => {
    try {
      const { limit, skip, sortBy, order } = req.query;
      const age = await User.find({
        $and: [
          {
            age: { $gt: 26, $lte: 20 },
          },
        ],
      })
        .sort(
          sortBy && order
            ? {
                [sortBy]: order,
              }
            : undefined
        )
        .skip(skip)
        .limit(limit);

      if (!age) {
        return res.status(404).send();
      }
      res.json(age);
    } catch (error) {
      next(error);
    }
  })

  // 4) tutte le risorse con il dato eyes uguale a green
  .get("/q4", async (req, res, next) => {
    try {
      const { limit, skip, sortBy, order, ...userFilter } = req.query;
      const query = {};
      for (const key of Object.keys(userFilter)) {
        query[key] = {
          $regex: req.query[key],
          $options: "i",
        };
      }

      const age = await User.find(query)
        .sort(
          sortBy && order
            ? {
                // "price": "ascending" | "descending"

                [sortBy]: order,
              }
            : undefined
        )
        .skip(skip)
        .limit(limit);

      if (!age) {
        return res.status(404).send();
      }
      res.json(age);
    } catch (error) {
      next(error);
    }
  })

  // 5) dato con eyeColor grenne oppure brown
  // {"$or":[{"eyeColor":"green"},{"eyeColor":"brown"}]}

  //6) tutte le risorse che non hanno eyeColor = green
  //{"eyeColor": { "$ne": "green" }}

  //7) tutte le risorse che non hanno eyeColor green and blue
  //{"$nor": [{"eyeColor": "green"}, {"eyeColor": "blue"}]}

  //8) tutte le risorse con dato company = "FITCORE" e ritorna solo l'email
  .get("/q8", async (req, res, next) => {
    try {
      const company = await User.find({ company: "FITCORE" }).select("email");

      const email = company.map((doc) => doc.email);
      if (!company) {
        return res.status(404).send();
      }
      res.json(email);
    } catch (error) {
      next(error);
    }
  });

export default usersRouter;
