const userModel = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwtUtils = require('../utills/jwtUtills');

const userRegister = async (userData) => {
    const existingUser = await userModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(userData.phone_number)) {
        throw new Error("Invalid phone number. It should be a 10-digit number.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = await userModel.create({
      ...userData,
      password: hashedPassword,
    });

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phone_number: user.phone_number
      },
    };
  }

  const userLogin = async (email, password) => {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwtUtils.generateToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
    };
}

module.exports = {
    userRegister,
    userLogin
}