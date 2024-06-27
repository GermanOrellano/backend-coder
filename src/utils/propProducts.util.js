const propProducts = (data) => {
  const { title, photo } = data;
  if (
    !title ||
    !photo ||
    typeof title !== "string" ||
    typeof photo !== "string"
  ) {
    const error = new Error("The information is incorrect");
    error.statusCode = 404;
    throw error;
  }
};

export default propProducts;
