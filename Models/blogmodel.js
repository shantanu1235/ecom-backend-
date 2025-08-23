const mongoose = require('mongoose');

const BlogCardSchema = new mongoose.Schema({
  image: { type: String },      // Card image filename/path
  heading: { type: String },
  service: { type: String },
  name: { type: String },
  date: { type: String },
  subHeading: { type: String }
});

const BlogSectionSchema = new mongoose.Schema({
  heading: { type: String },
  bgColor: { type: String, default: "#ffffff" },
  cardOverlay: { type: String, default: "#ffffff" },
  headingColor: { type: String, default: "#000000" },
  headingFont: { type: String, default: "inherit" },
  headingStyle: { type: Object, default: {} },
  cards: [BlogCardSchema]
}, { timestamps: true });

module.exports = mongoose.model('BlogSection', BlogSectionSchema);