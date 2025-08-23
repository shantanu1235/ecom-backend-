const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  mainImage: { type: String },      // Card main image filename/path
  reviewIcon: { type: String },     // Card review icon filename/path
  locationIcon: { type: String },   // Card location icon filename/path
  reviewNumber: { type: String },   // e.g. "4.4"
  totalReviews: { type: String },   // e.g. "104 Reviews"
  heading: { type: String },        // Card heading
  headingLink: { type: String },    // Optional link for heading
  location: { type: String },       // Card location text
  bookButton: { type: String },     // Book button text
  bookUrl: { type: String }         // Book button URL
});

const ServicesSectionSchema = new mongoose.Schema({
  topTitle: {
    text: { type: String },
    color: { type: String },
    font: { type: String },
    style: { type: Object }
  },
  heading: {
    text: { type: String },
    color: { type: String },
    font: { type: String },
    style: { type: Object }
  },
  subHeading: {
    text: { type: String },
    color: { type: String },
    font: { type: String },
    style: { type: Object }
  },
  cards: [CardSchema], // Array of cards
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServicesSection', ServicesSectionSchema);