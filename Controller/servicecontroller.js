const ServicesSection = require('../Models/servicemodel');

// POST: Create new services section with card images
exports.createServicesSection = async (req, res) => {
  try {
    const topTitle = typeof req.body.topTitle === "string" ? JSON.parse(req.body.topTitle) : req.body.topTitle;
    const heading = typeof req.body.heading === "string" ? JSON.parse(req.body.heading) : req.body.heading;
    const subHeading = typeof req.body.subHeading === "string" ? JSON.parse(req.body.subHeading) : req.body.subHeading;
    let cards = req.body.cards;
    if (typeof cards === "string") {
      cards = JSON.parse(cards);
    }
    // Attach mainImage to each card if uploaded
    cards = cards.map((card, idx) => ({
      ...card,
      mainImage: req.files && req.files[`mainImage${idx}`]
        ? req.files[`mainImage${idx}`][0].filename
        : card.mainImage
    }));

    const section = new ServicesSection({
      topTitle,
      heading,
      subHeading,
      cards,
    });
    await section.save();
    res.status(201).json({ success: true, data: section });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all services sections
exports.getAllServicesSections = async (req, res) => {
  try {
    const sections = await ServicesSection.findOne();
    res.json({ success: true, data: sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single services section by ID
exports.getServicesSectionById = async (req, res) => {
  try {
    const section = await ServicesSection.findById(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update services section by ID
exports.updateServicesSection = async (req, res) => {
  try {
    const topTitle = typeof req.body.topTitle === "string" ? JSON.parse(req.body.topTitle) : req.body.topTitle;
    const heading = typeof req.body.heading === "string" ? JSON.parse(req.body.heading) : req.body.heading;
    const subHeading = typeof req.body.subHeading === "string" ? JSON.parse(req.body.subHeading) : req.body.subHeading;
    let cards = req.body.cards;
    if (typeof cards === "string") {
      cards = JSON.parse(cards);
    }
    cards = cards.map((card, idx) => ({
      ...card,
      mainImage: req.files && req.files[`mainImage${idx}`]
        ? req.files[`mainImage${idx}`][0].filename
        : card.mainImage
    }));
    const mainImage = req.file ? req.file.filename : req.body.mainImage;

    const updateData = {
      topTitle,
      heading,
      subHeading,
      cards,
      mainImage
    };

    const section = await ServicesSection.findByIdAndUpdate(
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

// DELETE: Delete services section by ID
exports.deleteServicesSection = async (req, res) => {
  try {
    const section = await ServicesSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};