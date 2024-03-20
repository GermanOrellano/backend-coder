import { Router } from "express";

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
        return params[1].json({ statusCode: 500, message: error.message });
      }
    });
  }
  create(path, ...cbs) {
    this.router.post(path, this.applyCbs(cbs));
  }
  read(path, ...cbs) {
    this.router.get(path, this.applyCbs(cbs));
  }
  update(path, ...cbs) {
    this.router.put(path, this.applyCbs(cbs));
  }
  destroy(path, ...cbs) {
    this.router.delete(path, this.applyCbs(cbs));
  }
  use(path, ...cbs) {
    this.router.use(path, this.applyCbs(cbs));
  }
}
