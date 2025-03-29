const Category = require('../models/category');

const createCategory = async (req, res) => {
    try {
        let category = await Category.findOne({ userName: req.body.categoryName });
        if (!category) {
            category = await Category.create(req.body);
        }
        res.status(201).json({ message: 'Category created', data: category });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
};

module.exports = { createCategory };