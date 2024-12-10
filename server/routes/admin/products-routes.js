const express = require('express');
const router = express.Router();

const {
    handleImageUpload,
    addProduct,
    editProduct,
    fetchAllProducts,
    deleteProduct,
  } = require("../../controllers/admin/products-controller");
const {upload} = require('../../helpers/cloudinary');

// routing for image upload

// Uploading single file
router.post("/upload-image",upload.single("my_file"),handleImageUpload);

// add product
router.post("/add", addProduct);

// edit product -> for this we use put becox we wantt to update existing . And also for editing we need to get product id , so we are sending id as a params
router.put("/edit/:id", editProduct);

// delete product -> for this we use delete becox we wantt to delete existing . And also for deleting we need to get product id , so we are sending id as a params
router.delete("/delete/:id", deleteProduct);

// fetch product
router.get("/get", fetchAllProducts);

module.exports = router;