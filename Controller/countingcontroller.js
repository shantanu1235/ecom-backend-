const CountingSection = require('../Models/countingmodel');

// POST: Create new counting section
exports.createCountingSection = async (req, res) => {
  try {
    let columns = req.body.columns;
    if (typeof columns === "string") {
      columns = JSON.parse(columns);
    }
    const bgImage = req.file ? req.file.filename : req.body.bgImage;

    const section = new CountingSection({
      bgImage,
      columns,
    });
    await section.save();
    res.status(201).json({ success: true, data: section });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all counting sections
exports.getAllCountingSections = async (req, res) => {
  try {
    const sections = await CountingSection.find();
    res.json({ success: true, data: sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single counting section by ID
exports.getCountingSectionById = async (req, res) => {
  try {
    const section = await CountingSection.findById(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update counting section by ID
exports.updateCountingSection = async (req, res) => {
  try {
    let columns = req.body.columns;
    if (typeof columns === "string") {
      columns = JSON.parse(columns);
    }
    const bgImage = req.file ? req.file.filename : req.body.bgImage;

    const updateData = {
      bgImage,
      columns,
    };

    const section = await CountingSection.findByIdAndUpdate(
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

// DELETE: Delete counting section by ID
exports.deleteCountingSection = async (req, res) => {
  try {
    const section = await CountingSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false,})
  }
}