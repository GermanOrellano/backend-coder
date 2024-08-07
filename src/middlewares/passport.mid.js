import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
//import users from "../data/mongo/mongo.manager.js";
import repository from "../repositories/users.rep.js";
import errors from "../utils/errors/errors.js";

const { GOOGLE_ID, GOOGLE_CLIENT, GITHUB_ID, GITHUB_CLIENT, SECRET } =
  process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await repository.readByEmail(email);
        if (one) {
          return done(null, false, errors.exist);
        } else {
          //data.password = createHash(password);
          const user = await repository.create(req.body);
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await repository.readByEmail(email);
        const verify = verifyHash(password, user.password);
        if (user?.verified && verify) {
          const token = createToken({
            email,
            role: user.role,
            uid: user._id,
          });
          req.token = token;
          return done(null, user);
        } else {
          return done(null, false, errors.badAuth);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/auth/google/cb",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await repository.readByEmail(profile.id + "@gmail.com");
        if (user) {
          req.session.email = user.email;
          req.session.role = user.role;
          return done(null, user);
        } else {
          user = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            lastname: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await repository.create(user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      passReqToCallback: true,
      clientID: GITHUB_ID,
      clientSecret: GITHUB_CLIENT,
      callbackURL: "http://localhost:8080/api/auth/github/cb",
    },

    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await repository.readByEmail(profile.id + "github.com");
        if (!user) {
          user = {
            email: profile.id + "github.com",
            name: profile.username,
            //agregar lastname
            photo: profile._json.avatar_url,
            password: createHash(profile.id),
          };
          user = await repository.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
    },
    async (payload, done) => {
      try {
        const user = await repository.readByEmail(payload.email);
        if (user) {
          user.password = "";
          return done(null, user);
        } else {
          return done(null, false, errors.forbidden);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
