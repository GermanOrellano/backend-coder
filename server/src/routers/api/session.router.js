import { Router } from "express";
import { users } from "../../data/mongo/mongo.manager.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";

const sessionRouter = Router();

sessionRouter.post("/register", has8char, async (req, res, next) => {
  try {
    const data = req.body;
    await users.create(data);
    return res.json({
      statusCode: 200,
      message: "Registered",
    });
  } catch (error) {
    return next(error);
  }
});

sessionRouter.post(
  "/login",
  /* isValidPass ,*/ async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (email && password === "hola1234") {
        req.session.email = email;
        req.session.role = "admin";
        return res.json({
          statusCode: 200,
          message: "Login",
        });
      } else {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
);

sessionRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Signed out",
      });
    } else {
      const error = new Error("No auth");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

export default sessionRouter;
