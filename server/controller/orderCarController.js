const orderCar = require('../models/OrderCar');


// ✅ Get all orders of a particular user (passenger)
exports.getOrdersByUser = async (req, res) => {
    const { userid } = req.params;

    try {
        const userOrders = await orderCar
            .find({ ownerid: userid })
            .populate("carid", "cartitle price carimage1") // populate car info
            .populate("ownerid", "fullname emailid");      // populate user info

        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user orders', error });
    }
};


exports.getAllorderCars = async (req, res) => {
    try {
        const orderCars = await orderCar.find().populate("carid","cartitle").populate("ownerid","fullname");
        res.status(200).json(orderCars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orderCars', error });
    }
}


exports.createorderCar = async (req, res) => {
    const { carid, ownerid, bookingdate, sourcelocation, destinationlocation, pickuptime, droptime} = req.body;

    try {
        const neworderCar = new orderCar({ carid, ownerid, bookingdate, sourcelocation, destinationlocation, pickuptime, droptime});
        await neworderCar.save();
        res.status(201).json(neworderCar);
    } catch (error) {
        res.status(500).json({ message: 'Error creating orderCar', error });
    }
}

// delete orderCar
exports.deleteorderCar = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedorderCar = await orderCar.findByIdAndDelete(id);

        if (!deletedorderCar) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};




// update orderCar
exports.updateorderCar = async (req, res) => {
    const { id } = req.params;
    const { carid, ownerid, bookingdate, sourcelocation, destinationlocation, pickuptime, droptime } = req.body;

    try {
        const updatedorderCar = await orderCar.findByIdAndUpdate(
            id,
            { 
                $set: {
                    carid,
                    ownerid,
                    bookingdate,
                    sourcelocation,
                    destinationlocation,
                    pickuptime,
                    droptime
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedorderCar) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedorderCar);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
};
