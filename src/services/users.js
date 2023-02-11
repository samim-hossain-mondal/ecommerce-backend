const { User } = require('../../database/models');
const httpError = require('../utils/httpError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (name, password, isAdmin) => {

  const user = await User.findOne({ where: { name } });
  console.log('2...', user);

  if (user) {
    throw new httpError('username is taken, try another', 409);
  }
  console.log('3...');
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, password: hashedPassword, isAdmin });
  return newUser;
};

const loginUser = async (name, password) => {
  const user = await User.findOne({ where: { name } });
  if (!user.dataValues) {
    throw new httpError('username or password is incorrect', 401);
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.dataValues.password);
  if (!isPasswordCorrect) {
    throw new httpError('username or password is incorrect', 401);
  }
  console.log(process.env);
  console.log(process.env.JWTSECRET);
  const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'secret', { expiresIn: 3600 });
  return { token, isAdmin: user.isAdmin };
};

module.exports = { registerUser, loginUser };