const mongoose = require('mongoose');

const CountingColumnSchema = new mongoose.Schema({
  number: { type: String, required: true },
  numberColor: { type: String, default: "#000000" },
  numberFont: { type: String, default: "inherit" },
  numberStyle: { type: Object, default: {} },
  heading: { type: String, required: true },
  headingColor: { type: String, default: "#000000" },
  headingFont: { type: String, default: "inherit" },
  headingStyle: { type: Object, default: {} }
});

const CountingSectionSchema = new mongoose.Schema({
  bgImage: { type: String }, // uploaded background image filename/path
  columns: [CountingColumnSchema], // array of 3 columns
}, { timestamps: true });

module.exports = mongoose.model('CountingSection', CountingSectionSchema);