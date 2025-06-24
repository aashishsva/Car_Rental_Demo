const Booking = require('../models/Booking');


exports.getBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ userId }).populate('carId');
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};


exports.createBooking = async (req, res) => {
  try {
    const {
      userId,
      carId,
      pickupDate,
      dropDate,
      pickupLocation,
      dropLocation,
      paymentMethod,
      totalAmount
    } = req.body;

    if (!userId || !carId || !pickupDate || !dropDate || !pickupLocation || !dropLocation || !paymentMethod || !totalAmount) {
      return res.status(400).json({ error: 'All booking fields are required' });
    }

    const booking = new Booking({
      userId,
      carId,
      pickupDate,
      dropDate,
      pickupLocation,
      dropLocation,
      paymentMethod,
      totalAmount
    });

    await booking.save();

    res.status(201).json({ success: true, message: 'Booking created successfully', booking });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ success: false, error: 'Failed to create booking' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    );
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Cancellation failed' });
  }
};
