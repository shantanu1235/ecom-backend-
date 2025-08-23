const mongoose= require('mongoose')

const {Schema}=mongoose

const HeroSectionSchema = new mongoose.Schema({
  topTitle: {
    text: { type: String },
    color: { type: String },
    font: { type: String },
    style: { type: Object }
  },
  heading1: {
    text: { type: String },
    color: { type: String },
    font: { type: String },
    style: { type: Object }
  },
  heading2: {
    text: { type: String },
    color: { type: String },
    font: { type: String },
    style: { type: Object }
  },
  heroImg: { type: String }, // filename/path of uploaded image
  button: {
    text: { type: String },
    url: { type: String },
    color: { type: String },
    font: { type: String },
    style: { type: Object }
  }
}, { timestamps: true });
const heromodel=mongoose.model('Hero',HeroSectionSchema)

module.exports=heromodel

