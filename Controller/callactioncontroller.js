const callmodel = require('../Models/callaction');


// POST: Create new CallAction
exports.createCallAction = async (req, res) => {
  try {
    const callAction = new callmodel(req.body);
    await callAction.save();
    res.status(201).json({ success: true, data: callAction });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET: Get all CallActions
exports.getAllCallActions = async (req, res) => {
  try {
    const callActions = await callmodel .findOne();
    res.json({ success: true, data: callActions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: Get single CallAction by ID
exports.getCallActionById = async (req, res) => {
  try {
    const callAction = await callmodel.findById(req.params.id);
    if (!callAction) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: callAction });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT: Update CallAction by ID
exports.updateCallAction = async (req, res) => {
  try {
    const callAction = await callmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!callAction) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: callAction });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE: Delete CallAction by ID
exports.deleteCallAction = async (req, res) => {
  try {
    const callAction = await callmodel.findByIdAndDelete(req.params.id);
    if (!callAction) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};