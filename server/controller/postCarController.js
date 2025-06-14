const postCar = require('../models/PostCar');
const vehicleOwner = require('../models/VehicleOwner');

// Get all postCars of logged-in vehicle owner
exports.getAllpostCars = async (req, res) => {
  try {
    const { vehicleownerid } = req.query;

    // If no vehicleownerid is provided, return error
    if (!vehicleownerid) {
      return res.status(400).json({ message: 'vehicleownerid is required' });
    }

    const postCars = await postCar.find({ vehicleownerid })  // <-- ✅ Filter here
      .populate("catid", "catname")
      .populate("vehicleownerid", "fullname");

    res.status(200).json(postCars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching postCars', error });
  }
};



exports.createpostCar = async (req, res) => {
  console.log("REQ BODY:", req.body);
  console.log("Vehicle Owner ID:", req.body.vehicleownerid);
  try {
    const {
      catid,
      vehicleownerid,
      cartitle,
      shortdescription,
      postdate,
      price,
      variant,
      driverstatus,
      registrationyear,
      carvehicleno,
      rcnumber
    } = req.body;

    const carimage1 = req.files?.carimage1?.[0]?.filename || null;
    const carimage2 = req.files?.carimage2?.[0]?.filename || null;
    const rcimage = req.files?.rcimage?.[0]?.filename || null;

    const newpostCar = new postCar({
      catid,
      vehicleownerid,
      cartitle,
      shortdescription,
      postdate,
      price,
      variant,
      driverstatus,
      registrationyear,
      carvehicleno,
      rcnumber,
      carimage1,
      carimage2,
      rcimage
    });

    await newpostCar.save();

    await vehicleOwner.findByIdAndUpdate(
      vehicleownerid,
      { $push: { postcars: newpostCar._id } },
      { new: true }
    );

    res.status(201).json(newpostCar);
  } catch (error) {
    console.log("Error in createpostCar:", error);
    res.status(500).json({ message: 'Error creating postCar', error });
  }
};

// Update postCar by ID with optional new images
exports.updatepostCar = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      catid,
      vehicleownerid,
      cartitle,
      shortdescription,
      postdate,
      price,
      variant,
      driverstatus,
      registrationyear,
      carvehicleno,
      rcnumber
    } = req.body;

    const updateFields = {
      ...(catid && { catid }),
      ...(vehicleownerid && { vehicleownerid }),
      ...(cartitle && { cartitle }),
      ...(shortdescription && { shortdescription }),
      ...(postdate && { postdate }),
      ...(price && { price }),
      ...(variant && { variant }),
      ...(driverstatus && { driverstatus }),
      ...(registrationyear && { registrationyear }),
      ...(carvehicleno && { carvehicleno }),
      ...(rcnumber && { rcnumber })
    };

    if (req.files?.carimage1?.[0]) updateFields.carimage1 = req.files.carimage1[0].filename;
    if (req.files?.carimage2?.[0]) updateFields.carimage2 = req.files.carimage2[0].filename;
    if (req.files?.rcimage?.[0]) updateFields.rcimage = req.files.rcimage[0].filename;

    const updatedpostCar = await postCar.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedpostCar) {
      return res.status(404).json({ message: 'PostCar not found' });
    }

    res.status(200).json(updatedpostCar);
  } catch (error) {
    res.status(500).json({ message: 'Error updating postCar', error });
  }
};

// Delete postCar by ID and remove from owner's postcars[]
exports.deletepostCar = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedpostCar = await postCar.findByIdAndDelete(id);

    if (!deletedpostCar) {
      return res.status(404).json({ message: 'PostCar not found' });
    }

    await vehicleOwner.findByIdAndUpdate(
      deletedpostCar.vehicleownerid,
      { $pull: { postcars: deletedpostCar._id } }
    );

    res.status(200).json({ message: 'PostCar deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting postCar', error });
  }
};
