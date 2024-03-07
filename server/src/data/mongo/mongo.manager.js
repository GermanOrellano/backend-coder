import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";
import { Types } from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }

  async read(obj) {
    try {
      let { filter, orderAndPaginate } = obj;
      const all = await this.model.paginate(filter, orderAndPaginate);
      if (all.totalPages === 0) {
        const error = new Error("There is nothing to read");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async reportBill(id) {
    try {
      const report = await this.model.aggregate([
        { $match: { uid: new Types.ObjectId(id) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "pid",
            as: "pid",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$pid", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        {
          $group: { _id: "$uid", total: { $sum: "$subtotal" } },
        },
        {
          $project: { _id: 0, uid: "$_id", total: "$total", date: new Date() },
        },
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }
}

const users = new MongoManager(User);
const products = new MongoManager(Product);
const orders = new MongoManager(Order);

export { users, products, orders };
