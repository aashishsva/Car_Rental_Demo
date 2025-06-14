const postCar = require('../models/PostCar');

// Get all postCars with populated catname and owner fullname
exports.getAllpostCars = async (req, res) => {
  try {
    const postCars = await postCar.find()
      .populate("catid", "catname")
      .populate("vehicleownerid", "fullname");
    res.status(200).json(postCars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching postCars', error });
  }
};

// Create new postCar with image filenames from multer (req.files)
exports.createpostCar = async (req, res) => {
  try {
    console.log('Body:', req.body);
    console.log('Files:', req.files);
    const carimage1 = req.files?.carimage1 ? req.files.carimage1[0].filename : null;
    const carimage2 = req.files?.carimage2 ? req.files.carimage2[0].filename : null;

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
      carvehicleno
    } = req.body;

    const newpostCar = new postCar({
      catid,
      vehicleownerid,
      cartitle,
      shortdescription,
      carimage1,
      carimage2,
      postdate,
      price,
      variant,
      driverstatus,
      registrationyear,
      carvehicleno
    });

    await newpostCar.save();
    res.status(201).json(newpostCar);

  } catch (error) {
    res.status(500).json({ message: 'Error creating postCar', error });
  }
};

// Delete postCar by ID
exports.deletepostCar = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedpostCar = await postCar.findByIdAndDelete(id);

    if (!deletedpostCar) {
      return res.status(404).json({ message: 'postCar not found' });
    }

    res.status(200).json({ message: 'postCar deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting postCar', error });
  }
};

// Update postCar by ID with optional image update from multer
exports.updatepostCar = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if new images uploaded
    const carimage1 = req.files?.carimage1 ? req.files.carimage1[0].filename : undefined;
    const carimage2 = req.files?.carimage2 ? req.files.carimage2[0].filename : undefined;

    // Destructure body
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
      carvehicleno
    } = req.body;

    // Build update object - only add keys that have value (not undefined or null)
    const updateFields = {};
    if (catid !== undefined) updateFields.catid = catid;
    if (vehicleownerid !== undefined) updateFields.vehicleownerid = vehicleownerid;
    if (cartitle !== undefined) updateFields.cartitle = cartitle;
    if (shortdescription !== undefined) updateFields.shortdescription = shortdescription;
    if (postdate !== undefined) updateFields.postdate = postdate;
    if (price !== undefined) updateFields.price = price;
    if (variant !== undefined) updateFields.variant = variant;
    if (driverstatus !== undefined) updateFields.driverstatus = driverstatus;
    if (registrationyear !== undefined) updateFields.registrationyear = registrationyear;
    if (carvehicleno !== undefined) updateFields.carvehicleno = carvehicleno;

    // Only overwrite images if new ones are uploaded
    if (carimage1 !== undefined) updateFields.carimage1 = carimage1;
    if (carimage2 !== undefined) updateFields.carimage2 = carimage2;

    const updatedpostCar = await postCar.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedpostCar) {
      return res.status(404).json({ message: 'postCar not found' });
    }

    res.status(200).json(updatedpostCar);

  } catch (error) {
    res.status(500).json({ message: 'Error updating postCar', error });
  }
};
