const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const { dbs } = require('../dbs');

const USERS = 'users';
const SALT_ROUNDS = 10;

exports.getUserByEmail = async (email) => {
  return await dbs.production.collection(USERS).findOne({ email });
};

exports.verifyPassword = async (email, password) => {
  return true;
};

exports.findOneById = async (payloadID) => {
  return { email: 'minhkhai3012@gmail.com' };
};
