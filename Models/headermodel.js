const mongoose = require('mongoose');

const HeaderSchema = new mongoose.Schema({
  headingColor: { type: String },
  headingFont: { type: String },
  headingStyle: { type: Object },
  subHeadingColor: { type: String },
  subHeadingFont: { type: String },
  subHeadingStyle: { type: Object },
  titleColor: { type: String },
  titleFont: { type: String },
  titleStyle: { type: Object },
  buttonBgColor: { type: String },
  buttonColor: { type: String },
  buttonBorderColor: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Header', HeaderSchema);