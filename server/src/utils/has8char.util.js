function has8char(password) {
  if (password.lenght < 8) {
    const error = new Error("Password must have a least 8 characters");
    error.statusCode = 400;
    throw error;
  }
}

export default has8char;
