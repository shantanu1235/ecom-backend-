const BlogSection = require('../Models/blogmodel');

// POST: Create new blog section
exports.createBlogSection = async (req, res) => {
  try {
    // Parse headingStyle if sent as string
    const headingStyle = typeof req.body.headingStyle === "string" ? JSON.parse(req.body.headingStyle) : req.body.headingStyle;
    let cards = req.body.cards;
    if (typeof cards === "string") {
      cards = JSON.parse(cards);
    }

    // Handle card images if sent as files (for multiple cards)
    if (req.files) {
      cards = cards.map((card, idx) => ({
        ...card,
        image: req.files[`image${idx}`] ? req.files[`image${idx}`][0].filename : card.image
      }));
    }

    const section = new BlogSection({
      heading: req.body.heading,
      bgColor: req.body.bgColor,
      cardOverlay: req.body.cardOverlay,
      headingColor: req.body.headingColor,
      headingFont: req.body.headingFont,
      headingStyle,
      cards,
    });
    await section.save();
    res.status(201).json({ success: true, data: section });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all blog sections
exports.getAllBlogSections = async (req, res) => {
  try {
    const sections = await BlogSection.findOne();
    res.json({ success: true, data: sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single blog section by ID
exports.getBlogSectionById = async (req, res) => {
  try {
    const section = await BlogSection.findById(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update blog section by ID
exports.updateBlogSection = async (req, res) => {
  try {
    const headingStyle = typeof req.body.headingStyle === "string" ? JSON.parse(req.body.headingStyle) : req.body.headingStyle;
    let cards = req.body.cards;
    if (typeof cards === "string") {
      cards = JSON.parse(cards);
    }

    // Handle card images if sent as files (for multiple cards)
    if (req.files) {
      cards = cards.map((card, idx) => ({
        ...card,
        image: req.files[`image${idx}`] ? req.files[`image${idx}`][0].filename : card.image
      }));
    }

    const updateData = {
      heading: req.body.heading,
      bgColor: req.body.bgColor,
      cardOverlay: req.body.cardOverlay,
      headingColor: req.body.headingColor,
      headingFont: req.body.headingFont,
      headingStyle,
      cards,
    };

    const section = await BlogSection.findByIdAndUpdate(
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

// DELETE: Delete blog section by ID
exports.deleteBlogSection = async (req, res) => {
  try {
    const section = await BlogSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};