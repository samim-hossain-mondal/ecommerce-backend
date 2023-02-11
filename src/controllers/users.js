const services = require('../services/users');
const httpError = require('../utils/httpError');

const registerUser = async (req, res) => {
  const { name, password, isAdmin } = req.body;
  try {
    const newUser = await services.registerUser(name, password, isAdmin);
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof httpError) {
      res.status(err.statusCode).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const { token } = await services.loginUser(name, password);
    res.status(200).json({ message: 'Login Successful', token: token });
  } catch (err) {
    if (err instanceof httpError) {
      res.status(err.statusCode).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = { registerUser, loginUser };