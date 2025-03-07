const userService = require('../services/user.services');

const userRegister = async (req, res) => {
    try {
      const user = await userService.userRegister(req.body);

      res.status(201).json({
        success: true,
        message: 'Registration successful',
        ...user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const result = await userService.userLogin(email, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        ...result
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Login failed'
      });
    }
}

  module.exports = {
    userRegister,
    userLogin
  }