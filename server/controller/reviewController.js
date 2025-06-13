const review = require('../models/Review');

exports.getAllreviews = async (req, res) => {
    try {
        const reviews = await review.find().populate("carid", "cartitle").populate("passengerid", "fullname");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
}

exports.createreview = async (req, res) => {
    const { carid, passengerid, reviewmessage, reviewrate, postdate} = req.body;

    try {
        const newreview = new review({ carid, passengerid, reviewmessage, reviewrate, postdate});
        await newreview.save();
        res.status(201).json(newreview);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error });
    }
}

// Update Review
exports.updatereview = async (req, res) => {
    const { id } = req.params;
    const { carid, passengerid, reviewmessage, reviewrate, postdate } = req.body;

    try {
        const updatedreview = await review.findByIdAndUpdate(
            id,
            {
                $set: { carid, passengerid, reviewmessage, reviewrate, postdate }
            },
            { new: true, runValidators: true }
        );

        if (!updatedreview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(updatedreview);
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error });
    }
};

// Delete Review
exports.deletereview = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedreview = await review.findByIdAndDelete(id);

        if (!deletedreview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
};
