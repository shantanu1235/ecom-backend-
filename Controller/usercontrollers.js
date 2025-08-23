const userModel = require('../Models/usermodel');
const jwt = require('jsonwebtoken');

// Cookie options
const cookieOption = {
  httpOnly: true,
  secure: false, // true in production with HTTPS
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// SIGNUP
exports.signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }
  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    const user = await userModel.create({ name, email, password });
    user.password = undefined;
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
    res.cookie('token', token, cookieOption);
    return res.status(201).json({ success: true, message: 'User registered', data: user, token });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }
  try {
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    user.password = undefined;
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
    res.cookie('token', token, cookieOption);
    return res.status(200).json({ success: true, message: 'Login successful', data: user, token });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ success: true, message: 'Logout successful' });
};

// GET PROFILE (requires authentication middleware to set req.user)
exports.getProfile = async (req, res) => {
  try {
    // req.user.id should be set by auth middleware after verifying JWT
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.password = undefined;
    return res.status(200).json({ success: true, data: user });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};