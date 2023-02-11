const { User } = require('../../database/models');
const httpError = require('../utils/httpError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (name, password, isAdmin) => {
  const user = await User.findOne({ where: { name } });
  if (user) {
    throw new httpError('username is taken, try another', 409);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, password: hashedPassword, isAdmin });
  return newUser;
};

const loginUser = async (name, password, payload) => {
  const user = await User.findOne({ where: { name } });
  if (!user) {
    throw new httpError('username or password is incorrect', 401);
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new httpError('username or password is incorrect', 401);
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
  return { token, isAdmin: user.isAdmin };
};

module.exports = { registerUser, loginUser };