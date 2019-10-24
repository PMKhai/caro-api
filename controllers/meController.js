const jwt = require('jsonwebtoken');

exports.getProfile = (req, res, next) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, 'your_jwt_secret', (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log('ERROR: Could not connect to the protected route');
      return res.status(403).json({
        data: null,
        error: 'not authorized',
      });
    } else {
      //If token is successfully verified, we can send the autorized data
      delete authorizedData.password;
      console.log('SUCCESS: Connected to protected route');
      return res.json({
        data: authorizedData,
        error: null,
      });
    }
  });
};
