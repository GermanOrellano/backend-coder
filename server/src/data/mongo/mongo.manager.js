import { Types } from "mongoose";
import CustomError from "../../utils/errors/CustomError.util.js";
import errors from "../../utils/errors/errors.js";
import notFoundOne from "../../utils/notFoundOne.util.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async read({ filter, orderAndPaginate }) {
    try {
      const all = await this.model.paginate(filter, orderAndPaginate);
      if (all.totalDocs === 0) {
        CustomError.new(errors.notFound);
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id).lean();
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
        { $match: { user_id: new Types.ObjectId(id) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        {
          $group: { _id: "$user_id", total: { $sum: "$subtotal" } },
        },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            currency: "USD",
            date: new Date(),
          },
        },
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }
}

export default MongoManager;
