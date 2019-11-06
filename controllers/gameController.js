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
      myTroop: null,
      yourTroop: null,
      playFirst: null,
    };
    match.push(user);
    if (match.length === 2) {
      console.log(match);

      const io = req.app.get('io');

      let i = 0;
      match.forEach((user) => {
        if (i === 0) {
          user.myTroop = 'X';
          user.yourTroop = 'O';
          user.playFirst = true;
        } else {
          user.myTroop = 'O';
          user.yourTroop = 'X';
          user.playFirst = false;
        }
        i += 1;
        const room = Math.round(new Date().getTime() / 1000);
        console.log(room);

        user.roomId = room;
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
