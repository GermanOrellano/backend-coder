import { Router } from "express";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionRouter = Router();

sessionRouter.post(
  "/register",
  has8char,
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/auth/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Registered",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/auth/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in",
        token: req.token,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//google
sessionRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//google-cb
sessionRouter.get(
  "/google/cb",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with Google",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionRouter.post("/signout", async (req, res, next) => {
  try {
    console.log(req.session.email);
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

sessionRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad Auth",
    });
  } catch (error) {
    next(error);
  }
});

export default sessionRouter;
