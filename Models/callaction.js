const mongoose = require('mongoose');

const CallActionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  headingColor: { type: String },
  headingFont: { type: String },
  headingStyle: { type: Object },
  subHeading: { type: String, required: true },
  subHeadingColor: { type: String },
  subHeadingFont: { type: String },
  subHeadingStyle: { type: Object },
  placeholderContent: { type: String },
  placeholderColor: { type: String },
  placeholderFont: { type: String },
  placeholderStyle: { type: Object },
  subscribeBtn: { type: String },
  subscribeBtnColor: { type: String },
  subscribeBtnFont: { type: String },
  subscribeBtnStyle: { type: Object },
  subscribeBgColor: { type: String },
  boxShadowColor: { type: String },
  containerBgColor: { type: String },
  containerFluidBgColor: { type: String },
  emailIcon: { type: String }, // filename/path of uploaded image
}, { timestamps: true });

const callmodel=mongoose.model('Models',CallActionSchema)

module.exports=callmodel