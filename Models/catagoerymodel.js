// models/categorySectionModel.js

const mongoose = require('mongoose');

// This defines the structure for individual items within the category list.
const CategoryItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    linkUrl: { type: String, default: '' },
    iconClass: { type: String, default: '' }
});

// Example schema
const CategorySectionSchema = new mongoose.Schema({
  sectionIdentifier: { type: String, default: 'main_category_section' },
  cards: [
    {
      image: String,
      items: [String],
      color: String,
      font: String,
      style: Object,
    }
  ],
  timestamp: Date,
});

// Create and export the model
const CategorySection = mongoose.model('CategorySection', CategorySectionSchema);

module.exports = CategorySection;