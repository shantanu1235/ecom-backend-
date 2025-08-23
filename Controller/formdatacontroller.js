const GetInTouchSection = require('../Models/formdatamodule');

// POST: Create new GetInTouchSection & send mail
exports.createGetInTouch = async (req, res) => {
  try {
    const data = req.body;

    const section = await GetInTouchSection.create(data);

    res.status(201).json({ success: true, data: section, message: "Form data saved!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get all GetInTouchSections
exports.getAllGetInTouch = async (req, res) => {
  try {
    const sections = await GetInTouchSection.findOne();
    res.json({ success: true, data: sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single GetInTouchSection by ID
exports.getGetInTouchById = async (req, res) => {
  try {
    const section = await GetInTouchSection.findById(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update GetInTouchSection by ID
exports.updateGetInTouch = async (req, res) => {
  try {
    const section = await GetInTouchSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: section, message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE: Delete GetInTouchSection by ID
exports.deleteGetInTouch = async (req, res) => {
  try {
    const section = await GetInTouchSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};