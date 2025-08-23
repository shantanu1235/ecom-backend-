const mongoose = require('mongoose');

const TestimonialUserSchema = new mongoose.Schema({
  image: { type: String },      // User image filename/path
  name: { type: String },
  location: { type: String },
  heading: { type: String },
  subHeading: { type: String },
  nameColor: { type: String, default: "#000000" },
  nameFont: { type: String, default: "inherit" },
  nameStyle: { type: Object, default: {} },
  locationColor: { type: String, default: "#000000" },
  locationFont: { type: String, default: "inherit" },
  locationStyle: { type: Object, default: {} },
  headingColor: { type: String, default: "#000000" },
  headingFont: { type: String, default: "inherit" },
  headingStyle: { type: Object, default: {} },
  subHeadingColor: { type: String, default: "#000000" },
  subHeadingFont: { type: String, default: "inherit" },
  subHeadingStyle: { type: Object, default: {} }
});

const TestimonialsSectionSchema = new mongoose.Schema({
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
  users: [TestimonialUserSchema], // Array of user testimonials (3 users)
  sectionIdentifier: { type: String, default: "testimonials_section_1" }
}, { timestamps: true });

module.exports = mongoose.model('TestimonialsSection', TestimonialsSectionSchema);

// Code to find and update the section
