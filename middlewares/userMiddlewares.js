const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .send({error: error.details.map((detail) => detail.message).join(', ')});
  }
  next();
};

exports.validate = validate;
