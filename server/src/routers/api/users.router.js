import { Router } from "express";
import user from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await user.create(data);
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
    const all = await user.read();
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
    const one = await user.readOne(uid);
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
    const uOne = await user.update(uid, data);

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
    const dOne = await user.destroy(uid);
    return res.json({
      statusCode: 200,
      message: dOne,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
