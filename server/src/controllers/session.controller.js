import service from "../services/users.service.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";
import { createToken } from "../utils/token.util.js";

class SessionController {
  constructor() {
    this.service = service;
  }

  register = async (req, res, next) => {
    const { email, name, verifiedCode } = req.user;
    //const { verifyCode } = req.user;
    await this.service.register({ email, name, verifiedCode });
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
      if (req.user) {
        const { email, role, photo, name, lastname, _id: id } = req.user;
        return res.success200({ email, role, photo, name, lastname, _id: id });
      } else {
        return res.error401();
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
      const { email, verifiedCode } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {
        await service.update(user._id, { verified: true });
        return res.success200("Verified user");
      } else {
        return CustomError.new(errors.invalidCred); //revisar error
      }
    } catch (error) {
      return next(error);
    }
  };

  badauth = async (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };

  recovery = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await this.service.readByEmail(email);
      if (user) {
        const uToken = createToken({ user_id: user._id });
        await this.service.recovery(user, uToken);
        return res.success200("Email sent");
      } else {
        return CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
}

const controller = new SessionController();
const {
  register,
  login,
  signout,
  verifyAccount,
  me,
  google,
  github,
  recovery,
} = controller;
export {
  register,
  login,
  signout,
  verifyAccount,
  me,
  google,
  github,
  recovery,
};
