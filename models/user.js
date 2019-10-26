const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const { dbs } = require('../dbs');

const USERS = 'users';
const SALT_ROUNDS = 10;

exports.getUserByEmail = async (email) => {
  return await dbs.production.collection(USERS).findOne({ email });
};

exports.verifyPassword = async (email, password) => {
  const user = await dbs.production.collection(USERS).findOne({ email });
  return bcrypt.compare(password, user.password);
};

exports.findOneById = async (payloadID) => {
  return { email: 'minhkhai3012@gmail.com' };
};

exports.insertNewAccount = async (email, password) => {
  const passwordHass = await bcrypt.hash(password, SALT_ROUNDS);
  return await dbs.production
    .collection(USERS)
    .insertOne({ email, password: passwordHass });
};

exports.editAccount = async (id, gender) => {
  return dbs.production
    .collection(USERS)
    .updateOne({ _id: ObjectID(id) }, { $set: { gender: gender } });
};

exports.getUserByIdGoogle = async (IdGoogle) => {
  return await dbs.production.collection(USERS).findOne({ sub: IdGoogle });
};

exports.insertNewAccountGoogle = async (user) => {
  const { sub, name, picture, given_name, family_name, locale } = user;
  return await dbs.production
    .collection(USERS)
    .insertOne({ sub, name, given_name, family_name, picture, locale });
};
