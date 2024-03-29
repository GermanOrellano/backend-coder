import { Router } from "express";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallback from "../../middlewares/passCallback.mid.js";

const sessionRouter = Router();

sessionRouter.post(
  "/register",
  has8char,
  /* passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/auth/badauth",
  }), */
  passCallback("register"),
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
  /*  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/auth/badauth",
  }), */
  passCallback("login"),
  async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in",
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

//github
sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

sessionRouter.post(
  "/signout",
  /* passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/auth/signout/cb",
  }), */
  passCallback("jwt"),
  async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//signout cb
sessionRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "Already done",
    });
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
