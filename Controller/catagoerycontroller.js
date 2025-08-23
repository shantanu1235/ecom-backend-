const CategorySection = require('../Models/catagoerymodel');

// POST: Create or update (upsert) category section
exports.createOrUpdateCategorySection = async (req, res) => {
  try {
    const cardsCount = parseInt(req.body.cardsCount, 10) || 0;
    const cards = [];

    for (let i = 0; i < cardsCount; i++) {
      let image = null;
      if (req.files && req.files[`categoryImg${i}`] && req.files[`categoryImg${i}`][0]) {
        image = req.files[`categoryImg${i}`][0].filename;
      }
      const items = JSON.parse(req.body[`categoryItems${i}`] || "[]");
      const color = req.body[`color${i}`] || "#000000";
      const font = req.body[`font${i}`] || "inherit";
      const style = JSON.parse(req.body[`style${i}`] || "{}");

      cards.push({
        image,
        items,
        color,
        font,
        style,
      });
    }

    // Save or update the section (upsert)
    const sectionIdentifier = req.body.sectionIdentifier || 'main_category_section';
    const section = await CategorySection.findOneAndUpdate(
      { sectionIdentifier },
      { sectionIdentifier, cards, timestamp: new Date() },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get all category sections
exports.getAllCategorySections = async (req, res) => {
  try {
    const sections = await CategorySection.findOne();
    res.json({ success: true, data: sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single category section by ID
exports.getCategorySectionById = async (req, res) => {
  try {
    const section = await CategorySection.findById(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update category section by ID
exports.updateCategorySection = async (req, res) => {
  try {
    let items = req.body.items;
    if (typeof items === "string") {
      items = JSON.parse(items);
    }

    let style = req.body.style;
    if (typeof style === "string") {
      style = JSON.parse(style);
    }

    const updateData = {
      categoryImg: req.file ? req.file.filename : req.body.categoryImg,
      items: items || [],
      categoryImage: req.body.categoryImage,
      categoryItems: req.body.categoryItems,
      color: req.body.color,
      font: req.body.font,
      style: style,
      timestamp: new Date()
    };

    const section = await CategorySection.findByIdAndUpdate(
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

// DELETE: Delete category section by ID
exports.deleteCategorySection = async (req, res) => {
  try {
    const section = await CategorySection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};