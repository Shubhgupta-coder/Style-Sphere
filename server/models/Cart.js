const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    // here it is which user is added the product to the cart so here we took reference from User model
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        // here it is the id of product which is added to cart , so here we took ref of Product model . 
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);