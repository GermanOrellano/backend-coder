import products from "../data/mongo/products.mongo.js";

export default (req, res, next) => {
  try {
    const { pid, stock } = req.params;
    const one = products.readOne(pid);
    if (one.stock >= stock) {
      return next();
    } else {
      const error = new Error("No stock");
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
