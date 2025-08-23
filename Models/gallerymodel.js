const mongoose=require('mongoose')

const {Schema}=mongoose

const GallerySectionSchema = new mongoose.Schema({
  heading: {
    text: { type: String, default: "HAIR SALOON , MASSAGE, BEAUTY SALON" },
    color: { type: String, default: "#000000" },
    font: { type: String, default: "inherit" },
    style: { type: Object, default: {} }
  },
  topTitle: {
    text: { type: String, default: "Find a service close to you" },
    color: { type: String, default: "#000000" },
    font: { type: String, default: "inherit" },
    style: { type: Object, default: {} }
  },
  images: [
    {
      fileName: { type: String }, // uploaded file name/path
      label: { type: String }     // e.g. "First Column Image"
    }
  ]
}, { timestamps: true });

const gallerymodel=mongoose.model('gallery',GallerySectionSchema)
module.exports=gallerymodel