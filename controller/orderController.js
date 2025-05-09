const OrderModel = require('../models/orders');
exports.CreateOrder = async (req, res) => {
    try {
        const {
            
            customer_name,
            customer_email,
            customer_address,
            customer_phone,
            customer_card,
            customer_expire,
            customer_cvv,
            cartItems,
           
            
        } = req.body;

        if (!customer_name || !customer_email || !cartItems?.length) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        const newOrder = new OrderModel({
         
            customer_name,
            customer_email,
            customer_address,
            customer_phone,
            customer_card,
            customer_expire,
            customer_cvv,
            cartItems,
            
            
        });

        await newOrder.save();

        // ✅ Use `return` to stop further code
        return res.status(201).json({
            message: "Order placed successfully",
            success: true
        });

    } catch (error) {
        console.error("Order error:", error);

        // ✅ Also add `return` here
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};



exports.getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({}).populate('cartItems');  // Populating cartItems with product details

    if (orders && orders.length > 0) {
      return res.status(200).json({
        message: "All orders fetched successfully",
        success: true,
        orders: orders
      });
    } else {
      return res.status(404).json({
        message: "No orders found",
        success: false
      });
    }
  } catch (error) {
    console.error("Order fetch error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false
    });
  }
};

  



