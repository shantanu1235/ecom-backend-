const Footer = require('../Models/footermodel');

// POST: Create new footer section
exports.createFooter = async (req, res) => {
  try {
    const footer = new Footer({
      logo: req.file ? req.file.filename : req.body.logo,
      socialIcons: req.body.socialIcons ? JSON.parse(req.body.socialIcons) : [],
      headings1: req.body.headings1 ? JSON.parse(req.body.headings1) : [],
      headings2: req.body.headings2 ? JSON.parse(req.body.headings2) : [],
      menuItems: req.body.menuItems ? JSON.parse(req.body.menuItems) : [],
      contactHeading: req.body.contactHeading,
      contactDetails: req.body.contactDetails ? JSON.parse(req.body.contactDetails) : [],
      copyrights: req.body.copyrights ? JSON.parse(req.body.copyrights) : [],
    });
    await footer.save();
    res.status(201).json({ success: true, data: footer });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all footer sections
exports.getAllFooters = async (req, res) => {
  try {
    const footers = await Footer.findOne();
    res.json({ success: true, data: footers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single footer by ID
exports.getFooterById = async (req, res) => {
  try {
    const footer = await Footer.findById(req.params.id);
    if (!footer) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: footer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update footer by ID
exports.updateFooter = async (req, res) => {
  try {
    const updateData = {
      logo: req.file ? req.file.filename : req.body.logo,
      socialIcons: req.body.socialIcons ? JSON.parse(req.body.socialIcons) : [],
      headings1: req.body.headings1 ? JSON.parse(req.body.headings1) : [],
      headings2: req.body.headings2 ? JSON.parse(req.body.headings2) : [],
      menuItems: req.body.menuItems ? JSON.parse(req.body.menuItems) : [],
      contactHeading: req.body.contactHeading,
      contactDetails: req.body.contactDetails ? JSON.parse(req.body.contactDetails) : [],
      copyrights: req.body.copyrights ? JSON.parse(req.body.copyrights) : [],
    };

    const footer = await Footer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!footer) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: footer });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE: Delete footer by ID
exports.deleteFooter = async (req, res) => {
  try {
    const footer = await Footer.findByIdAndDelete(req.params.id);
    if (!footer) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}