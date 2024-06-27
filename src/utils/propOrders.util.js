const propOrders = (data) => {
  const { pid, uid, quantity, state } = data;
  if (!pid || !uid || !quantity || !state) {
    const error = new Error("Problem creating order");
    error.statusCode = 404;
    throw error;
  }
};

export default propOrders;
