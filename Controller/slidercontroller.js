const SingleSlider = require('../Models/slider');

// POST: Create new single slider
exports.createSingleSlider = async (req, res) => {
  try {
    // Parse JSON fields if sent as strings
    const heading = typeof req.body.heading === "string" ? JSON.parse(req.body.heading) : req.body.heading;
    const bookNow = typeof req.body.bookNow === "string" ? JSON.parse(req.body.bookNow) : req.body.bookNow;

    // Example: req.files.bgImage is an array of files
    const bgImages = req.files.bgImage?.map(file => file.filename) || []; // <-- agar schema me array hai

    const slider = new SingleSlider({
      heading,
      bookNow,
      prevButtonBgColor: req.body.prevButtonBgColor,
      nextButtonBgColor: req.body.nextButtonBgColor,
      prevIcon: req.files && req.files.prevIcon ? req.files.prevIcon[0].filename : req.body.prevIcon,
      nextIcon: req.files && req.files.nextIcon ? req.files.nextIcon[0].filename : req.body.nextIcon,
      bgImage: bgImages,
    });
    await slider.save();
    res.status(201).json({ success: true, data: slider });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all single sliders
exports.getAllSingleSliders = async (req, res) => {
  try {
    const sliders = await SingleSlider.findOne();
    res.json({ success: true, data: sliders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single slider by ID
exports.getSingleSliderById = async (req, res) => {
  try {
    const slider = await SingleSlider.findById(req.params.id);
    if (!slider) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: slider });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update single slider by ID
exports.updateSingleSlider = async (req, res) => {
  try {
    const heading = typeof req.body.heading === "string" ? JSON.parse(req.body.heading) : req.body.heading;
    const bookNow = typeof req.body.bookNow === "string" ? JSON.parse(req.body.bookNow) : req.body.bookNow;

    // Example: req.files.bgImage is an array of files
    const bgImages = req.files.bgImage?.map(file => file.filename) || []; // <-- agar schema me array hai

    const updateData = {
      heading,
      bookNow,
      prevButtonBgColor: req.body.prevButtonBgColor,
      nextButtonBgColor: req.body.nextButtonBgColor,
      prevIcon: req.files && req.files.prevIcon ? req.files.prevIcon[0].filename : req.body.prevIcon,
      nextIcon: req.files && req.files.nextIcon ? req.files.nextIcon[0].filename : req.body.nextIcon,
      bgImage: bgImages,
    };

    const slider = await SingleSlider.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!slider) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: slider });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE: Delete single slider by ID
exports.deleteSingleSlider = async (req, res) => {
  try {
    const slider = await SingleSlider.findByIdAndDelete(req.params.id);
    if (!slider) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message})
  }
}