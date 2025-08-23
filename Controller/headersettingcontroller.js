const HeaderSettings = require('../Models/headersettingmodel');

// POST: Create new header settings
exports.createHeaderSettings = async (req, res) => {
  try {
    let menuItems = req.body.menuItems;
    if (typeof menuItems === "string") {
      menuItems = JSON.parse(menuItems);
    }
    const headerSettings = new HeaderSettings({ ...req.body, menuItems });
    await headerSettings.save();
    res.status(201).json({ success: true, data: headerSettings });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// POST: Create or update header settings (upsert by _id or other logic)
exports.createOrUpdateHeaderSettings = async (req, res) => {
  try {
    let menuItems = req.body.menuItems;
    if (typeof menuItems === "string") {
      menuItems = JSON.parse(menuItems);
    }
    menuItems = menuItems.map(({ name, url }) => ({ name, url }));

    const updateData = {
      menuItems,
      selectedColor: req.body.selectedColor,
      selectedFont: req.body.selectedFont,
      mobileMenuEnabled: req.body.mobileMenuEnabled === "true" || req.body.mobileMenuEnabled === true,
      logoFile: req.file ? req.file.filename : req.body.logoFile,
    };

    // Upsert logic (update first found or create new)
    const settings = await HeaderSettings.findOneAndUpdate(
      {}, // Empty filter: updates first found or creates new
      updateData,
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all header settings
exports.getHeaderSettings = async (req, res) => {
  try {
    const settings = await HeaderSettings.findOne();
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single header settings by ID
exports.getHeaderSettingsById = async (req, res) => {
  try {
    const settings = await HeaderSettings.findById(req.params.id);
    if (!settings) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update header settings by ID
exports.updateHeaderSettings = async (req, res) => {
  try {
    let menuItems = req.body.menuItems;
    if (typeof menuItems === "string") {
      menuItems = JSON.parse(menuItems);
    }
    menuItems = menuItems.map(({ name, url }) => ({ name, url }));

    const updateData = {
      menuItems,
      selectedColor: req.body.selectedColor,
      selectedFont: req.body.selectedFont,
      mobileMenuEnabled: req.body.mobileMenuEnabled === "true" || req.body.mobileMenuEnabled === true,
      logoFile: req.file ? req.file.filename : req.body.logoFile,
    };

    const settings = await HeaderSettings.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!settings) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE: Delete header settings by ID
exports.deleteHeaderSettings = async (req, res) => {
  try {
    const settings = await HeaderSettings.findOneAndDelete(req.params.id);
    if (!settings) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get latest header settings (single document)
