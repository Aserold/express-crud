const requestLogger = (req, res, next) => {
  console.log(`${req.method} request on endpoint "${req.path}"`);
  next();
};

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .send({error: error.details.map((detail) => detail.message).join(', ')});
  }
  next();
};

exports.requestLogger = requestLogger;
exports.validate = validate;
