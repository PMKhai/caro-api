exports.login = (req, res, next) => {
  const data = req.body;
  res.status(200).json({ error: false, data, errorCode: null });
};

exports.register = (req, res, next) => {
  const data = req.body;
  res.status(200).json({ error: false, data, errorCode: null });
};
