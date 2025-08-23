const heromodel = require("../Models/heromodel");

// POST: Create new hero section
exports.createHeroSection = async (req, res) => {
  try {
    const topTitle = typeof req.body.topTitle === "string" ? JSON.parse(req.body.topTitle) : req.body.topTitle;
    const heading1 = typeof req.body.heading1 === "string" ? JSON.parse(req.body.heading1) : req.body.heading1;
    const heading2 = typeof req.body.heading2 === "string" ? JSON.parse(req.body.heading2) : req.body.heading2;
    const button = typeof req.body.button === "string" ? JSON.parse(req.body.button) : req.body.button;

    const heroSection = new heromodel({
      topTitle,
      heading1,
      heading2,
      heroImg: req.file ? req.file.filename : req.body.heroImg,
      button,
    });
    await heroSection.save();
    res.status(201).json({ success: true, data: heroSection });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all hero sections
exports.getAllHeroSections = async (req, res) => {
  try {
    const heroes = await heromodel.findOne();
    res.json({ success: true, data: heroes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single hero section by ID
exports.getHeroSectionById = async (req, res) => {
  try {
    const hero = await heromodel.findById(req.params.id);
    if (!hero) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: hero });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update hero section by ID
exports.updateHeroSection = async (req, res) => {
  try {
    const topTitle = typeof req.body.topTitle === "string" ? JSON.parse(req.body.topTitle) : req.body.topTitle;
    const heading1 = typeof req.body.heading1 === "string" ? JSON.parse(req.body.heading1) : req.body.heading1;
    const heading2 = typeof req.body.heading2 === "string" ? JSON.parse(req.body.heading2) : req.body.heading2;
    const button = typeof req.body.button === "string" ? JSON.parse(req.body.button) : req.body.button;

    const updateData = {
      topTitle,
      heading1,
      heading2,
      heroImg: req.file ? req.file.filename : req.body.heroImg,
      button,
    };

    const hero = await heromodel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!hero) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: hero });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE: Delete hero section by ID
exports.deleteHeroSection = async (req, res) => {
  try {
    const hero = await heromodel.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};