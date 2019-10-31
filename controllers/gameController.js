const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

let match = [];
var roomId = null;

exports.findMatch = (req, res, next) => {
  try {
    const socketId = req.query.socketId;
    roomId = `${roomId}${socketId}`;

    const user = {
      socketId,
      roomId,
    };
    match.push(user);
    if (match.length === 2) {
      console.log(match);

      const io = req.app.get('io');

      match.forEach((user) => {
        user.roomId = roomId;
        io.in(user.socketId).emit('findmatch', user);
      });

      match = [];
      roomId = null;
    }
    res.end();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
