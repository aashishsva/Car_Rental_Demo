const category = require('../models/CategoryMaster');

exports.getAllcategorys = async (req, res) => {
    try {
        const categorys = await category.find();
        res.status(200).json(categorys);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categorys', error });
    }
}

exports.createcategory = async (req, res) => {
    const { catname} = req.body;

    try {
        const newcategory = new category({ catname});
        await newcategory.save();
        res.status(201).json(newcategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
}

// DELETE category
exports.deletecategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedcategory = await category.findByIdAndDelete(id);

        if (!deletedcategory) {
            return res.status(404).json({ message: 'category not found' });
        }

        res.status(200).json({ message: 'category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};

// UPDATE category
exports.updatecategory = async (req, res) => {
    const { id } = req.params;
    const { catname } = req.body;

    try {
        const updatedcategory = await category.findByIdAndUpdate(
            id,
            { $set: { catname } },
            { new: true, runValidators: true }
        );

        if (!updatedcategory) {
            return res.status(404).json({ message: 'category not found' });
        }

        res.status(200).json(updatedcategory);
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};
