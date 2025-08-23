const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
});

const HeaderSettingsSchema = new mongoose.Schema({
  menuItems: [MenuItemSchema],
  selectedColor: { type: String },
  selectedFont: { type: String },
  mobileMenuEnabled: { type: Boolean, default: false },
  logoFile: { type: String },
  loginLabel: { type: String },
  loginUrl: { type: String },
  signupLabel: { type: String },
  signupUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('HeaderSettings', HeaderSettingsSchema);
