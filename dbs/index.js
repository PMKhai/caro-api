const MongoClient = require('mongodb').MongoClient;

// connection string
const PROD_URI =
  'mongodb+srv://khai_pham:123456a@db-hd7kx.mongodb.net/server?retryWrites=true&w=majority';

var dbs = {
  production: {},
};

function connect(uri) {
  return MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => client.db());
}

exports.initdb = async () => {
  let database = await connect(PROD_URI);
  dbs.production = database;
};

exports.dbs = dbs;
