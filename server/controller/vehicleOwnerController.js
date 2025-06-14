const vehicleOwner = require('../models/VehicleOwner');

// controllers/vehicleOwnerController.js
exports.getProfile = async (req, res) => {
  try {
    const owner = await vehicleOwner.findById(req.user.userId);

    if (!owner) {
      return res.status(404).json({ message: 'Vehicle Owner not found' });
    }

    res.json(owner);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', err });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { fullname, address, aadhar, city, state, pincode } = req.body;

    const updated = await vehicleOwner.findByIdAndUpdate(
      req.user.userId,
      { fullname, address, aadhar, city, state, pincode },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', err });
  }
};


// GET ALL VEHICLE OWNERS
exports.getAllvehicleOwners = async (req, res) => {
    try {
        const vehicleOwners = await vehicleOwner.find()
            .populate("locationid", "locationname")
            .populate("postcars", "catid vehicleownerid cartitle carvehicleno postdate price variant driverstatus registrationyear");

        res.status(200).json(vehicleOwners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicleOwners', error });
    }
};

// CREATE VEHICLE OWNER
exports.createvehicleOwner = async (req, res) => {
    const { emailid, password, fullname, mobileno, dateofbirth, locationid, address, postcars } = req.body;

    try {
        const newvehicleOwner = new vehicleOwner({
            emailid,
            password,
            fullname,
            mobileno,
            dateofbirth,
            locationid,
            address,
            postcars: postcars || [] // default empty array if not passed
        });

        await newvehicleOwner.save();
        res.status(201).json(newvehicleOwner);
    } catch (error) {
        res.status(500).json({ message: 'Error creating vehicleOwner', error });
    }
};

// DELETE VEHICLE OWNER
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

// UPDATE VEHICLE OWNER
exports.updatevehicleOwner = async (req, res) => {
    const { id } = req.params;
    const { emailid, password, fullname, mobileno, dateofbirth, locationid, address, postcars } = req.body;

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
                    address,
                    postcars: postcars || [] // ensure postcars is updated
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
