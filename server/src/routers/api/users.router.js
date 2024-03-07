import { Router } from "express";
//import user from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/mongo.manager.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
    if (response === "Name, photo and email are required") {
      return res.json({
        statusCode: 400,
        response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { email: 1 },
    };
    let filter = {};
    if (req.query.email) {
      filter.email = new RegExp(req.query.email.trim(), "i");
    }
    if (req.query.sort === "asc") {
      orderAndPaginate.sort.email = 1;
    }
    const all = await users.read({ filter, orderAndPaginate });
    return res.json({
      statusCode: 200,
      message: all,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readOne(uid);
    return res.json({
      statusCode: 200,
      message: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const { email } = req.params;
    const one = await users.readByEmail(email);
    return res.json({
      statusCode: 200,
      message: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const uOne = await users.update(uid, data);

    return res.json({
      statusCode: 200,
      response: uOne,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const dOne = await users.destroy(uid);
    return res.json({
      statusCode: 200,
      message: dOne,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
