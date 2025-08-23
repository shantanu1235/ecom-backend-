const IncludesSection = require('../Models/includesModel');

// POST: Create new includes section
exports.createIncludesSection = async (req, res) => {
  try {
    // Parse JSON fields if sent as strings
    const topTitle = typeof req.body.topTitle === "string" ? JSON.parse(req.body.topTitle) : req.body.topTitle;
    const heading = typeof req.body.heading === "string" ? JSON.parse(req.body.heading) : req.body.heading;
    const subHeading = typeof req.body.subHeading === "string" ? JSON.parse(req.body.subHeading) : req.body.subHeading;
    const mainHeading = typeof req.body.mainHeading === "string" ? JSON.parse(req.body.mainHeading) : req.body.mainHeading;
    let ourListSections = req.body.ourListSections;
    if (typeof ourListSections === "string") {
      ourListSections = JSON.parse(ourListSections);
    }

    const includesSection = new IncludesSection({
      topTitle,
      heading,
      subHeading,
      mainHeading,
      ourListSections,
      bgImage: req.file ? req.file.filename : req.body.bgImage,
      videoUrl: req.body.videoUrl,
    });
    await includesSection.save();
    res.status(201).json({ success: true, data: includesSection });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all includes sections
exports.getAllIncludesSections = async (req, res) => {
  try {
    const sections = await IncludesSection.findOne();
    res.json({ success: true, data: sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single includes section by ID
exports.getIncludesSectionById = async (req, res) => {
  try {
    const section = await IncludesSection.findById(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update includes section by ID
exports.updateIncludesSection = async (req, res) => {
  try {
    const topTitle = typeof req.body.topTitle === "string" ? JSON.parse(req.body.topTitle) : req.body.topTitle;
    const heading = typeof req.body.heading === "string" ? JSON.parse(req.body.heading) : req.body.heading;
    const subHeading = typeof req.body.subHeading === "string" ? JSON.parse(req.body.subHeading) : req.body.subHeading;
    const mainHeading = typeof req.body.mainHeading === "string" ? JSON.parse(req.body.mainHeading) : req.body.mainHeading;
    let ourListSections = req.body.ourListSections;
    if (typeof ourListSections === "string") {
      ourListSections = JSON.parse(ourListSections);
    }

    const updateData = {
      topTitle,
      heading,
      subHeading,
      mainHeading,
      ourListSections,
      bgImage: req.file ? req.file.filename : req.body.bgImage,
      videoUrl: req.body.videoUrl,
    };

    const section = await IncludesSection.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: section });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE: Delete includes section by ID
exports.deleteIncludesSection = async (req, res) => {
  try {
    const section = await IncludesSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};