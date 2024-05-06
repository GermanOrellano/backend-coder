const errors = {
  error: { statusCode: 400, message: "Error" },
  message: (message) => ({ statusCode: 400, message }),
  passCb: (message, statusCode) => ({ statusCode, message }),
  invalidId: { statusCode: 400, message: "Invalid ID" },
  invalidCred: { statusCode: 401, message: "Invalid credentials" },
  badAuth: { statusCode: 401, message: "Bad auth" },
  exist: { statusCode: 401, message: "User already exist" },
  forbidden: { statusCode: 403, message: "Forbidden" },
  notFound: { statusCode: 404, message: "Not found docs" },
  fatal: { statusCode: 500, message: "Server error" },
};

export default errors;
