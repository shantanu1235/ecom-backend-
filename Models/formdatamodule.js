const mongoose = require('mongoose');

const GetInTouchSchema = new mongoose.Schema({
  topTitle: {
    text: { type: String },
    color: { type: String, default: "#000000" },
    font: { type: String, default: "inherit" },
    style: { type: Object, default: {} }
  },
  heading: {
    text: { type: String },
    color: { type: String, default: "#000000" },
    font: { type: String, default: "inherit" },
    style: { type: Object, default: {} }
  },
  subHeading: {
    text: { type: String },
    color: { type: String, default: "#000000" },
    font: { type: String, default: "inherit" },
    style: { type: Object, default: {} }
  },
  formBgColor: { type: String, default: "#ffffff" },
  containerBgColor: { type: String, default: "#FBF2E0" },

  // Form fields
  name: { type: String, default: "Name" },
  nameIcon: { type: String },      // filename/path
  emailIcon: { type: String },     // filename/path
  phoneIcon: { type: String },     // filename/path
  serviceIcon: { type: String },   // filename/path
  messageIcon: { type: String },   // filename/path

  submitBgColor: { type: String, default: "#3B82F6" }
}, { timestamps: true });

module.exports = mongoose.model('GetInTouchSection', GetInTouchSchema);



