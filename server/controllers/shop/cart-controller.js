const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const addToCart = async (req, res) => {
  try {
    //  for addToCart we need Userid , ProductId and Qty
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data Provided !!",
      });
    }

    // Now first we find the product which we add to Cart on the basis of product id
    // This will return the first cart document that belongs to a user with a particular userId.
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found !!",
      });
    }

    //  To find a single document in a collection by a specific condition, you can use the findOne() method.
    let cart = await Cart.findOne({ userId });

    // if user add item to the cart for the first time and no cart is already present then we are going to create a cart
    if (!cart) {
      cart = new Cart({
        userId,
        items: [], //becoz first time we will havea empty array means no item in cart
      });
    }

    // Now we are wanted to find the index of item which we are added in the cart array ,so that we can also know that whether we are added item for the first tym or we already have taht itemby that user in the cart . if item already present we will increase the cnt

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // means we are adding item for the first tym
    if (findCurrentProductIndex == -1) {
      cart.items.push({ productId, quantity });
    } else {
      // if item is already present means we are going to increase the quantity
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    // save in mongo db
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart, // cart
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    // first we are finding the id of user which are added item in cart
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!",
      });
    }

    // populate() is a Mongoose method used to automatically replace a field (or multiple fields) that contain ObjectIds with the actual data from the referenced documents.

    // path: 'item.productId':
    // The populate function looks at the item.productId field of the Cart document. It assumes that item.productId is an ObjectId referencing another collection (likely a Product collection). Instead of just returning the productId (which is an ObjectId), it will replace this ObjectId with the actual document from the Product collection that corresponds to that productId.

    // select: 'image title price salePrice':
    // The select option specifies which fields from the Product documents should be included in the populated result. In this case, only the image, title, price, and salePrice fields will be included. This means that instead of returning the entire product document, only these fields will be returned for each product in the cart.

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Hanling Scenario : When user add item to the cart but at that tym admin delete the cart item
    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      //means some of cart item deleted
      cart.items = validItems;
      await cart.save();
    }

    // Now we will populate items (fetch cart item)
    const populateCardItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc, //Access Raw Data: Sometimes, you might want to work with just the data stored in MongoDB without the extra methods and properties Mongoose attaches to the document object.
        items: populateCardItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

const updateCartItemQty = async (req, res) => {
  try {
    //  for updatencart we need Userid , ProductId and Qty
    const { userId, productId, quantity } = req.body;
    // finding cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.staus(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // now we will find item index .
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.staus(404).json({
        success: false,
        message: "Cart item not present",
      });
    }

    // if present update quntyty
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    //   updated cart item

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    // for delete we need userid and product id
    const {userId,productId} = req.params;
    if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
    }
    
    // finding cart and popultae
    const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image title price salePrice",
    });

    // if cart item is not present

    if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
    //   delete or filterout item from cart which is equal to that product id which we want to delete
      cart.items = cart.items.filter(
        (item) => item.productId._id.toString() !== productId
      );
  
      await cart.save();

    //   populate new card item
  
      await cart.populate({
        path: "items.productId",
        select: "image title price salePrice",
      });

    //   fretching
  
      const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
};
