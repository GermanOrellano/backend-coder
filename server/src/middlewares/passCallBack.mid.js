import passport from "./passport.mid.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";

export default (strategy) => {
  return async (req, res, next) => {
    try {
      passport.authenticate(strategy, (error, user, info) => {
        if (error) {
          return next(error);
        }
        if (!user) {
          CustomError.new(
            errors.passCb(
              info.message || errors.badAuth.message,
              info.statusCode || errors.badAuth.statusCode
            )
          );
        }
        req.user = user;
        return next();
      })(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
