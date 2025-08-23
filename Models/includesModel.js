const mongoose = require('mongoose');

const OurListSectionSchema = new mongoose.Schema({
  icon: { type: String }, // icon file name/path
  heading: { type: String },
  subHeading: { type: String }
});

const IncludesSectionSchema = new mongoose.Schema({
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
  mainHeading: {
    text: { type: String },
    color: { type: String, default: "#000000" },
    font: { type: String, default: "inherit" },
    style: { type: Object, default: {} }
  },
  ourListSections: [OurListSectionSchema], // Array of dynamic sections
  bgImage: { type: String }, // BG image file name/path
  videoUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('IncludesSection', IncludesSectionSchema);