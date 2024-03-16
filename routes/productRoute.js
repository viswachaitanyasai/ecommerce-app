import express from "express"
import { requireSignIn, isAdmin } from "../middlewares/authmiddleware.js"
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController } from "../controller/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// to add a product in db
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

// to get all product(12) in db
router.get("/get-product", getProductController);

// to get only one product from db
router.get("/get-product/:slug", getSingleProductController);


router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filters", productFilterController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", relatedProductController);

router.get("/product-category/:slug", productCategoryController);

//payment gateway routes
//for token
router.get("/braintree/token", braintreeTokenController);

//payment
router.post("/braintree/payment",requireSignIn, braintreePaymentController);


export default router