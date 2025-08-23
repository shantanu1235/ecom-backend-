const aboutModel = require("../Models/aboutmodel")

const about = async (req, res) => {
    const { title, heading, subheading, bgcolor } = req.body

    // Use req.file for single file upload
    const image = req.file ? req.file.filename : null

    if (!title || !heading || !subheading || !bgcolor || !image) {
        return res.status(400).json({
            success: false, // <-- should be false
            message: 'please fill all the fields'
        })
    }

    try {
        const aboutinfo = new aboutModel({
            title,
            heading,
            subheading,
            bgcolor,
            image
        })
        const result = await aboutinfo.save()

        return res.status(201).json({
            success: true,
            message: 'file created successfully',
            data: result
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

// GET API
const getAbout = async (req, res) => {
    try {
        const about = await aboutModel.findOne();
        return res.status(200).json({
            success: true,
            data: about
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
}
const updateAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, heading, subheading, bgcolor } = req.body;
        let updateData = { title, heading, subheading, bgcolor };

        // If image is uploaded, add it to updateData
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedAbout = await aboutModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedAbout) {
            return res.status(404).json({
                success: false,
                message: "About section not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "About section updated successfully",
            data: updatedAbout
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
}

module.exports = { about, getAbout,updateAbout }