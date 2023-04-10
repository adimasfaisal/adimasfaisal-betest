function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    let errors = {};

    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });

    return res.status(400).send(errors);
  } else {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.setHeader("Content-Type", "application/json");
    res.status(status);
    res.send({ message: message });
  }
}

module.exports = {
  errorHandler,
};
