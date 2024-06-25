import fs from "fs";
import notFoundOne from "../../utils/errors/CustomError.util.js";

class ProductManager {
  init() {
    const exist = fs.existsSync(this.path);
    try {
      !exist
        ? fs.writeFileSync(this.path, JSON.stringify([], null, 3))
        : (this.products = JSON.parse(fs.readFileSync(this.path, "utf-8")));
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }

  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Title, photo, price and stock are required");
      } else {
        this.products.push(data);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 3)
        );
        return data;
      }
    } catch (error) {
      throw error;
    }
  }

  read(filter, option) {
    try {
      if (this.products.length === 0) {
        const error = new Error("There is nothing to read");
        error.statusCode = 404;
        throw error;
      }

      let filterP = this.products.filter((product) => {
        for (let k in filter) {
          if (product[k] !== filter[k]) {
            return false;
          }
        }
        return true;
      });

      if (option.sort) {
        const [k, order] = Object.entries(option.sort)[0];
        filterP.sort((a, b) => {
          if (a[k] < b[k]) return order === "asc" ? -1 : 1;
          if (a[k] > b[k]) return order === "asc" ? 1 : -1;
          return 0;
        });
      }

      const page = option.page || 1;
      const limit = option.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginate = filterP.slice(startIndex, endIndex);
      const res = {
        docs: paginate,
        totalDocs: filterP.length,
        limit: limit,
        totalPages: Math.ceil(filterP.length / limit),
        page: page,
        pagingCounter: startIndex + 1,
        hasPrevPage: page > 1,
        hasNextPage: endIndex < filterP.length,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: endIndex < filterP.length ? page + 1 : null,
      };
      return res;
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = this.products.find((each) => each._id === id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      this.products = this.products.filter((each) => each._id != id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 3)
      );
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 3)
      );
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const product = new ProductManager("./src/data/fs/files/products.json");
export default product;
