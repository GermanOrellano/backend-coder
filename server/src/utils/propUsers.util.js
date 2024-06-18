const propUsers = (data) => {
  const { name, photo, email } = data;
  if (
    !name ||
    !photo ||
    !email ||
    typeof name !== "string" ||
    typeof photo !== "string" ||
    typeof email !== "string"
  ) {
    const error = new Error("The information is incorrect");
    error.statusCode = 404;
    throw error;
  }
};

export default propUsers;
