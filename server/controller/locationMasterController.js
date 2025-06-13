const location = require('../models/LocationMaster');

exports.getAlllocations = async (req, res) => {
    try {
        const locations = await location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
}

exports.createlocation = async (req, res) => {
    const { locationname} = req.body;

    try {
        const newlocation = new location({ locationname});
        await newlocation.save();
        res.status(201).json(newlocation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating location', error });
    }
}

// DELETE location
exports.deletelocation = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedlocation = await location.findByIdAndDelete(id);

        if (!deletedlocation) {
            return res.status(404).json({ message: 'location not found' });
        }

        res.status(200).json({ message: 'location deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting location', error });
    }
};


// UPDATE location
exports.updatelocation = async (req, res) => {
    const { id } = req.params;
    const { locationname } = req.body;

    try {
        const updatedlocation = await location.findByIdAndUpdate(
            id,
            { $set: { locationname } },
            { new: true, runValidators: true }
        );

        if (!updatedlocation) {
            return res.status(404).json({ message: 'location not found' });
        }

        res.status(200).json(updatedlocation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error });
    }
};

