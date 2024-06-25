import { Router } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../utils/errors/CustomError.util.js";
/* import users from "../data/mongo/users.mongo.js"; */
import errors from "../utils/errors/errors.js";
import env from "../utils/env.util.js";
import dao from "../data/index.factory.js";

const { users } = dao;

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }
  init() {}
  applyCbs(cbs) {
    return cbs.map((each) => async (...params) => {
      try {
        await each.apply(this, params);
      } catch (error) {
        params[1].json(errors.fatal);
      }
    });
  }
  responses = (req, res, next) => {
    res.success200 = (payload) =>
      res.json({ statusCode: 200, response: payload });
    res.success201 = (payload) =>
      res.json({ statusCode: 201, response: payload });
    res.error400 = () => CustomError.new(errors.message(message));
    res.error401 = () => CustomError.new(errors.badAuth);
    res.error403 = () => CustomError.new(errors.forbidden);
    res.error404 = () => CustomError.new(errors.notFound);
    return next();
  };
  policies = (arrayOfPolicies) => async (req, res, next) => {
    try {
      let token = req.cookies["token"];
      if (!token) return next();
      else {
        const data = jwt.verify(token, env.SECRET);
        if (!data) return res.error400("Bad auth by token");
        else {
          const { email, role } = data;
          if (arrayOfPolicies.includes(role)) {
            const user = await users.readByEmail(email);
            req.user = user;
            return next();
          } else {
            return res.error403();
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  };
  create(path, policies, ...cbs) {
    this.router.post(
      path,
      this.responses,
      this.policies(policies),
      this.applyCbs(cbs)
    );
  }
  read(path, policies, ...cbs) {
    this.router.get(
      path,
      this.responses,
      this.policies(policies),
      this.applyCbs(cbs)
    );
  }
  update(path, policies, ...cbs) {
    this.router.put(
      path,
      this.responses,
      this.policies(policies),
      this.applyCbs(cbs)
    );
  }
  destroy(path, policies, ...cbs) {
    this.router.delete(
      path,
      this.responses,
      this.policies(policies),
      this.applyCbs(cbs)
    );
  }
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCbs(cbs));
  }
}
