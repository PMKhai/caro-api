exports.getSocketId = (req, res, next) => {
  req.socketId = req.query.socketId;
  next();
};
