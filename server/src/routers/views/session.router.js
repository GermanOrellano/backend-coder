import { Router } from "express";

const loginRouter = Router();

loginRouter.get("/login", (req, res, next) => {
  try {
    return res.render("login");
  } catch (error) {
    next(error);
  }
});

const registerRouter = Router();

registerRouter.get("/register", (req, res, next) => {
  try {
    return res.render("register");
  } catch (error) {
    next(error);
  }
});

export { loginRouter, registerRouter };
