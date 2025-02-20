exports.GetProducts = async (req, res) => {
    try {
        res.json([
            {
                name: "Shoes",
                prize: 2000,
                category: "Men's",
                InStock: true
            },
            {
                name: "Shirt",
                prize: 100,
                category: "Women's",
                InStock: false
            },
            {
                name: "Cap",
                prize: 300,
                category: "Men's",
                InStock: true
            }
        ]);

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};
