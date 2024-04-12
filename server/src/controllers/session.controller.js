import service from "../services/users.service.js";

class SessionController {
  constructor() {
    this.service = service;
  }

  register = async (req, res, next) => {
    const { email, name } = req.body;
    await this.service.register({ email, name });
    try {
      return res.json({
        statusCode: 201,
        message: "Registered",
      });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", { maxAge: 60 * 60 * 24 * 7, httpOnly: true })
        .json({ statusCode: 200, message: "Logged In" });
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed Out",
      });
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
        return res.json({
          statusCode: 200,
          message: "Verified user",
        });
      } else {
        return res.json({
          statusCode: 400,
          message: "Invalid verified",
        });
      }
    } catch (error) {
      return next(error);
    }
  };
}

const controller = new SessionController();
const { register, login, signout, verifyAccount } = controller;
export { register, login, signout, verifyAccount };
