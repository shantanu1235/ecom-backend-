const mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
  logo: { type: String }, // logo image filename/path

  socialIcons: [
    {
      name: { type: String },
      icon: { type: String } // icon file name/path or SVG string
    }
  ],

  headings1: [{ value: { type: String } }], // Heading List 1
  headings2: [{ value: { type: String } }], // Heading List 2

  menuItems: [{ name: { type: String } }],

  contactHeading: { type: String },
  contactDetails: [
    {
      label: { type: String },
      value: { type: String }
    }
  ],

  copyrights: [{ value: { type: String } }]
}, { timestamps: true });

module.exports = mongoose.model('Footer', FooterSchema);