
const categoryDb = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    try {


        const { title, description } = req.body;

        const Iscategory = await categoryDb.findOne({ title });

        if (Iscategory) {
            return res.status(400).json({
                message: "category already Exsist",
                success: false
            })
        }

        const NewCategory = await categoryDb.create({
            title,
            description
        })

        res.status(200).json({
            message: "Category Created Successfully"
        })


    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            success: false
        })
    }
}


exports.getCategory = async (req, res) => {
    try {

        const category = await categoryDb.find({});

        if (category) {
            res.status(200).json({
                message: "categories fetched Successfully",
                success: true,
                category: category
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            success: false
        })
    }
}


exports.getCategoryById = async (req, res) => {
    try {
        const id = req.params.id; // Corrected extraction of ID

        const category = await categoryDb.findById(id); // Pass ID directly

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Category retrieved successfully",
            success: true,
            data: category // Include category data in response
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message // Include error details for debugging
        });
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id;

        // Ensure data is provided for update
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No update data provided",
                success: false
            });
        }

        // Updating category with given data
        const updateCategory = await categoryDb.findByIdAndUpdate(id, req.body, { new: true });

        if (!updateCategory) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Category Updated Successfully",
            success: true,
            updatedCategory: updateCategory // ✅ Fixed typo in response field
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message // Include error details for debugging
        });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteCategory = await categoryDb.findByIdAndDelete(id); // ✅ Sahi ID pass ki

        if (!deleteCategory) {
            return res.status(404).json({
                message: "Category nahi mili, is liye delete nahi hui",
                success: false
            });
        }

        res.status(200).json({
            message: "Category delete hogayi",
            success: true,
            deletedCategory: deleteCategory // ✅ Sahi variable naam rakha
        });

    } catch (error) {
        res.status(500).json({
            message: "Kuch ghalat hogaya, dubara koshish karein",
            success: false,
            error: error.message // ✅ Debugging ke liye error message bhej diya
        });
    }
};
