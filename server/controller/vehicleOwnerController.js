const vehicleOwner = require('../models/VehicleOwner');

exports.getAllvehicleOwners = async (req, res) => {
    try {
        const vehicleOwners = await vehicleOwner.find().populate("locationid","locationname");
        res.status(200).json(vehicleOwners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicleOwners', error });
    }
}

exports.createvehicleOwner = async (req, res) => {
    const { emailid, password, fullname, mobileno, dateofbirth, locationid, address} = req.body;

    try {
        const newvehicleOwner = new vehicleOwner({ emailid, password, fullname, mobileno, dateofbirth, locationid, address});
        await newvehicleOwner.save();
        res.status(201).json(newvehicleOwner);
    } catch (error) {
        res.status(500).json({ message: 'Error creating vehicleOwner', error });
    }
}

// DELETE vehicleOwner
exports.deletevehicleOwner = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedvehicleOwner = await vehicleOwner.findByIdAndDelete(id);

        if (!deletedvehicleOwner) {
            return res.status(404).json({ message: 'vehicleOwner not found' });
        }

        res.status(200).json({ message: 'vehicleOwner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vehicleOwner', error });
    }
};


// UPDATE vehicleOwner
exports.updatevehicleOwner = async (req, res) => {
    const { id } = req.params;
    const { emailid, password, fullname, mobileno, dateofbirth, locationid, address } = req.body;

    try {
        const updatedvehicleOwner = await vehicleOwner.findByIdAndUpdate(
            id,
            {
                $set: {
                    emailid,
                    password,
                    fullname,
                    mobileno,
                    dateofbirth,
                    locationid,
                    address
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedvehicleOwner) {
            return res.status(404).json({ message: 'vehicleOwner not found' });
        }

        res.status(200).json(updatedvehicleOwner);
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicleOwner', error });
    }
};
