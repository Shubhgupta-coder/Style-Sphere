// const { imageUploadUtil } = require("../../helpers/cloudinary");
// const Product = require("../../models/Product");
// // for product image uploading
// const handleImageUpload = async (req, res) => {
//   try {
//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     const url = "data:" + req.file.mimetype + ";base64," + b64;
//     const result = await imageUploadUtil(url);

//     res.json({
//       success: true,
//       result,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: "false",
//       message: "Error occured",
//     });
//   }
// };

// // add a new product

// const addProduct = async (req, res) => {
    
//     try {
//         // first to add data we need to fetch all details which user fill from our form
//         console.log('inside addProduct controllers');
//     const {
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       // averageReview,
//     } = req.body;

//     //   Now we are creating a new product
//     // Mongo DB model
//     const newlyCreatedProduct = new Product({
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       // averageReview,
//     });

//     // Now we are saving the newly created product
//     await newlyCreatedProduct.save();

//     res.status(201).json({
//       success: true,
//       data: newlyCreatedProduct,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error Occured",
//     });
//   }
// };
// // fetch all product

// const fetchAllProducts = async (req, res) => {
//   try {
//     // here we simply need to fetch all product
//     const listOfProducts = await Product.find({});
//     res.status(200).json({
//       success: true,
//       data: listOfProducts,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error Occured",
//     });
//   }
// };

// // edit a product

// const editProduct = async (req, res) => {
//   try {
//     // here first we need to fetch our product on the basis of product id. and then edit that product
//     // in our url fro where we are edit our product, there we are going to pass out product_id as a parameter , and we are going to receive that from our req.
//     const { id } = req.params; //product id

//     // getting all product details
//     const {
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       averageReview,
//     } = req.body;

//     //  Now we are finding product that product with thsi id exist or not;
//     const findProduct = await Product.findById(id);
//     if (!findProduct) {
//       return res.staus(404).json({
//         success: false,
//         message: "Product Not Found",
//       });
//     }

//     // if we fnd our product then we are updating our product info
//     // if we are not givng anything while editing then it will reamin same as existing (findProduct.somethong) otherwise we will replace it with new one

//     findProduct.title = title || findProduct.title;
//     findProduct.description = description || findProduct.description;
//     findProduct.category = category || findProduct.category;
//     findProduct.brand = brand || findProduct.brand;
//     findProduct.price = price === "" ? 0 : price || findProduct.price;
//     findProduct.salePrice =
//       salePrice === "" ? 0 : salePrice || findProduct.salePrice;
//     findProduct.totalStock = totalStock || findProduct.totalStock;
//     findProduct.image = image || findProduct.image;
//     findProduct.averageReview = averageReview || findProduct.averageReview;

//     await findProduct.save();
//     res.status(200).json({
//       success: true,
//       data: findProduct,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error Occured",
//     });
//   }
// };

// // delete a product
// const deleteProduct = async (req, res) => {
//   try {
//     // for delete producr also we need to first fetch product using product id
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete(id);

//     if (!product)
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });

//     res.status(200).json({
//       success: true,
//       message: "Product delete successfully",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error Occured",
//     });
//   }
// };
// module.exports = {
//   handleImageUpload,
//   addProduct,
//   fetchAllProducts,
//   editProduct,
//   deleteProduct,
// };

const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    console.log(averageReview, "averageReview");

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};