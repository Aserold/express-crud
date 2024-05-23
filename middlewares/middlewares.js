const requestLogger = (req, res, next) => {
  console.log(`${req.method} request on endpoint "${req.path}"`);
  next();
};

module.exports = requestLogger
