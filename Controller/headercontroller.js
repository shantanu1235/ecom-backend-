const Header = require('../Models/headermodel');

// POST: Create new header
exports.createHeader = async (req, res) => {
  try {
    const header = new Header(req.body);
    await header.save();
    res.status(201).json({ success: true, data: header });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all headers
exports.getAllHeaders = async (req, res) => {
  try {
    const headers = await Header.find();
    res.json({ success: true, data: headers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single header by ID
exports.getHeaderById = async (req, res) => {
  try {
    const header = await Header.findById(req.params.id);
    if (!header) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: header });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update header by ID
exports.updateHeader = async (req, res) => {
  try {
    const header = await Header.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!header) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: header });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE: Delete header by ID
exports.deleteHeader = async (req, res) => {
  try {
    const header = await Header.findByIdAndDelete(req.params.id);
    if (!header) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};