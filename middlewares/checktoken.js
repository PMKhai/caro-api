exports.checkToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return not authorized (403)
    return res.status(403).json({
      data: null,
      error: 'not authorized',
    });
  }
};
