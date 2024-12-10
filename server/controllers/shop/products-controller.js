const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    // get category and brand from our query
    // This line extracts the query parameters (category, brand, and sortBy) from the request query (req.query()).
    // If category and brand are not provided, they default to empty arrays ([]). If sortBy is not provided, it defaults to "price-lowtohigh".
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    // If category is non-empty, filters.category is set to { $in: category.split(',') }. This MongoDB-style syntax ($in) indicates a filter for items where the category is one of the values in category.split(",").
    // This will allow filtering of results by category and brand values if they are specified in the query.
    console.log(category, brand, "controller");

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    // sort  on the base of price or title
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    // now we want only filteered product
    const products = await Product.find(filters).sort(sort);

    console.log(products, "controller");

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some errror occured",
    });
  }
};

const getProductDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      console.log(product,'profduct');
      
  
      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product not found!",
        });
  
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (e) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
  };
module.exports = { getFilteredProducts, getProductDetails };
