import express from "express";
import product from "./fs/products.fs.js";
import user from "./fs/users.fs.js";

const server = express();

const PORT = 8080;
const ready = () => {
  console.log(`Express server listening on port: ${PORT}`);
};

server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

server.get("/api/products", (req, res) => {
  try {
    const all = product.read();
    return res.status(200).json({
      success: true,
      message: all,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const one = product.readOne(pid);
    return res.status(200).json({
      success: true,
      message: one,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/users", (req, res) => {
  try {
    const all = user.read();
    return res.status(200).json({
      success: true,
      message: all,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", (req, res) => {
  try {
    const { uid } = req.params;
    const one = user.readOne(uid);
    return res.status(200).json({
      success: true,
      message: one,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
