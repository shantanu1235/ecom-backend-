const gallerymodel = require("../Models/gallerymodel");

// POST: Create new gallery section
exports.createGallerySection = async (req, res) => {
  try {
    const heading = typeof req.body.heading === "string" ? JSON.parse(req.body.heading) : req.body.heading;
    const topTitle = typeof req.body.topTitle === "string" ? JSON.parse(req.body.topTitle) : req.body.topTitle;

    const images = [];
    for (let i = 1; i <= 5; i++) {
      if (req.files && req.files[`image${i}`]) {
        images.push({
          fileName: req.files[`image${i}`][0].filename,
          label: req.body[`label${i}`] || ""
        });
      }
    }

    const gallerySection = new gallerymodel({
      heading,
      topTitle,
      images,
    });
    await gallerySection.save();
    res.status(201).json({ success: true, data: gallerySection });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all gallery sections
exports.getAllGallerySections = async (req, res) => {
  try {
    const galleries = await gallerymodel.findOne();
    res.json({ success: true, data: galleries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single gallery section by ID
exports.getGallerySectionById = async (req, res) => {
  try {
    const gallery = await gallerymodel.findById(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: gallery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update gallery section by ID
exports.updateGallerySection = async (req, res) => {
  try {
    let images = req.body.images;
    if (typeof images === "string") {
      images = JSON.parse(images);
    }
    const updateData = {
      heading: req.body.heading,
      topTitle: req.body.topTitle,
      images: images,
    };
    const gallery = await gallerymodel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!gallery) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: gallery });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE: Delete gallery section by ID
exports.deleteGallerySection = async (req, res) => {
  try {
    const gallery = await gallerymodel .findByIdAndDelete(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};