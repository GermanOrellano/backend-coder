import service from "../services/users.service.js";

class SessionController {
  constructor() {
    this.service = service;
  }

  register = async (req, res, next) => {
    const { email, name } = req.body;
    const { verifyCode } = req.user;
    await this.service.register({ email, name, verifyCode });
    try {
      return res.success201("Registered");
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
      return res
        .cookie("token", req.token, opts)
        .success200({ message: "Logged in", userData: req.user });
    } catch (error) {
      return next(error);
    }
  };

  google = async (req, res, next) => {
    try {
      return res.success200("Logged in with Google!");
    } catch (error) {
      return next(error);
    }
  };

  github = async (req, res, next) => {
    try {
      return res.success200("Logged in with Github!");
    } catch (error) {
      return next(error);
    }
  };

  me = async (req, res, next) => {
    try {
      const isLogged = req.cookies.token ? true : false;
      if (isLogged) {
        const user = {
          email: req.user.email,
          role: req.user.role,
          photo: req.user.photo,
        };
        return res.success200(user);
      }
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").success200("Signed out");
    } catch (error) {
      return next(error);
    }
  };

  verifyAccount = async (req, res, next) => {
    try {
      const { verifiedCode, email } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {
        await service.update(user._id, { verified: true });
        return res.success200("Verified user");
      } else {
        return res.error401();
      }
    } catch (error) {
      return next(error);
    }
  };
}

const controller = new SessionController();
const { register, login, signout, verifyAccount, me, google, github } =
  controller;
export { register, login, signout, verifyAccount, me, google, github };
