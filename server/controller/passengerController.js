const passenger = require('../models/Passenger');

exports.getAllpassengers = async (req, res) => {
    try {
        const passengers = await passenger.find().populate('locationid', 'locationname -_id') // hides the _id

        res.status(200).json(passengers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching passengers', error });
    }
}

exports.createpassenger = async (req, res) => {
    const { emailid, password, fullname, mobileno, dateofbirth, locationid, address} = req.body;

    try {
        const newpassenger = new passenger({ emailid, password, fullname, mobileno, dateofbirth, locationid, address});
        await newpassenger.save();
        res.status(201).json(newpassenger);
    } catch (error) {
        res.status(500).json({ message: 'Error creating passenger', error });
    }
}

exports.deletepassenger = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedpassenger = await passenger.findByIdAndDelete(id);

        if (!deletedpassenger) {
            return res.status(404).json({ message: 'passenger not found' });
        }

        res.status(200).json({ message: 'passenger deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting passenger', error });
    }
};



exports.updatepassenger = async (req, res) => {
    const { id } = req.params;
    const { emailid, password, fullname, mobileno, dateofbirth, locationid, address } = req.body;

    try {
        const updatedpassenger = await passenger.findByIdAndUpdate(
            id,
            { $set: { emailid, password, fullname, mobileno, dateofbirth, locationid, address } },
            { new: true, runValidators: true }
        );

        if (!updatedpassenger) {
            return res.status(404).json({ message: 'passenger not found' });
        }

        res.status(200).json(updatedpassenger);
    } catch (error) {
        res.status(500).json({ message: 'Error updating passenger', error });
    }
};

