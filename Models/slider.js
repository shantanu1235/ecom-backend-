const mongoose = require('mongoose');

const SingleSliderSchema = new mongoose.Schema({
  heading: {
    text: { type: String },
    color: { type: String, default: "#000000" },
    font: { type: String, default: "inherit" },
    style: { type: Object, default: {} }
  },
  bookNow: {
    text: { type: String },
    url: { type: String },
    color: { type: String, default: "#000000" },
    font: { type: String, default: "inherit" },
    style: { type: Object, default: {} },
    bgColor: { type: String, default: "#FBF2E0" },
    borderColor: { type: String, default: "#FBF2E0" }
  },
  prevButtonBgColor: { type: String, default: "#FBF2E0" },
  nextButtonBgColor: { type: String, default: "#FBF2E0" },
  prevIcon: { type: String }, // filename/path
  nextIcon: { type: String }, // filename/path
  bgImage: [{ type: String }],  // filename/path
  // Optionally, you can add a listItems array if you want to support dynamic slides
  // listItems: [{ title: String, image: String }]
}, { timestamps: true });

module.exports = mongoose.model('SingleSlider', SingleSliderSchema);

