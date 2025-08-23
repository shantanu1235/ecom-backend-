const TestimonialsSection = require('../Models/testimonialsmodel');

// POST: Create new testimonials section
exports.createTestimonialsSection = async (req, res) => {
  try {
    // Parse JSON fields if sent as strings
    const topTitle = typeof req.body.topTitle === "string" ? JSON.parse(req.body.topTitle) : req.body.topTitle;
    const heading = typeof req.body.heading === "string" ? JSON.parse(req.body.heading) : req.body.heading;
    let users = req.body.users;
    if (typeof users === "string") {
      users = JSON.parse(users);
    }

    // Handle user images if sent as files (for multiple users)
    if (req.files) {
      users = users.map((user, idx) => ({
        ...user,
        image: req.files[`image${idx}`] ? req.files[`image${idx}`][0].filename : user.image
      }));
    }

    const section = new TestimonialsSection({
      topTitle,
      heading,
      users,
    });
    await section.save();
    res.status(201).json({ success: true, data: section });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all testimonials sections
exports.getAllTestimonialsSections = async (req, res) => {
  try {
    const sections = await TestimonialsSection.findOne();
    res.json({ success: true, data: sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single testimonials section by ID
exports.getTestimonialsSectionById = async (req, res) => {
  try {
    const section = await TestimonialsSection.findById(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update testimonials section by ID
exports.updateTestimonialsSection = async (req, res) => {
  try {
    const topTitle = typeof req.body.topTitle === "string" ? JSON.parse(req.body.topTitle) : req.body.topTitle;
    const heading = typeof req.body.heading === "string" ? JSON.parse(req.body.heading) : req.body.heading;
    let users = req.body.users;
    if (typeof users === "string") {
      users = JSON.parse(users);
    }

    // Handle user images if sent as files (for multiple users)
    if (req.files) {
      users = users.map((user, idx) => ({
        ...user,
        image: req.files[`image${idx}`] ? req.files[`image${idx}`][0].filename : user.image
      }));
    }

    const updateData = {
      topTitle,
      heading,
      users,
    };

    const section = await TestimonialsSection.findByIdAndUpdate(
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

// DELETE: Delete testimonials section by ID
exports.deleteTestimonialsSection = async (req, res) => {
  try {
    const section = await TestimonialsSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}