import Category from "../Models/CategoryModel.js";

// create a new main category with subcategories
//route POST /api/categories
//access private/admin

export const createCategory = async (req, res) => {
    const { name, subcategories } = req.body;

    try {
        const category = new Category({
            name,
            subcategories: subcategories.map(sub => ({ name: sub }))
        });
        await category.save(); // Changed from newCategory to category
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// get all categories with subcategories
//route GET /api/categories
//access public

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//update a category name or its subcategories
//route PUT /api/categories/:id
//access private/admin

export const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, subcategories } = req.body;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name || category.name;
        category.subcategories = subcategories.map(sub => ({ name: sub }));
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//delete a category
//route DELETE /api/categories/:id
//access private/admin

