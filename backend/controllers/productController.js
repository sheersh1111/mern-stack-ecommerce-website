const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

const mongoose= require("mongoose");


//Create Product
exports.createProduct = catchAsyncerrors(async (req, res) => {

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images;
    }
    
    const imagesLink = [];
    let len = images.length
    let result="";
    for (let i = 0; i < len; i++) {
         result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }console.log("mc")
    req.body.images = imagesLink;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    return res.status(201).json({
        success: true,
        product
    });
});
//GET ALL PRODUCTS
exports.getAllProducts = catchAsyncerrors(async (req, res, next) => {

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
    products = await apiFeature.query;
    
    
    const productCount = await Product.countDocuments();
    const resultPerPage = 8;
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query.clone();

    let filteredProductsCount = products.length;


    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
    })
});

//GET ALL PRODUCT(--ADMIN)
exports.getAdminProducts = catchAsyncerrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    })
});


// update product --admin
exports.updateProduct = catchAsyncerrors(async (req, res, next) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    let product=await Product.findById(id) ;
    console.log(product);
    
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    //images start here
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images;
    }
    
    
    if (images) {
        //Deleting Images from cloudinary
        console.log(product.name); 
        for (let i = 0; i < product.images.length; i++) {
                
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
    }
    
    const imagesLink = [];
    let len = images.length
    for (let i = 0; i < len; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }
    req.body.images = imagesLink;
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
});
// delete product
exports.deleteProduct = catchAsyncerrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(300).json({
            success: false,
            message: "product not found"
        })
    }
    //Deleting Images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();
    return res.status(200).json({
        success: true,
        message: "product deleted successfully"
    })
});
//get product details
exports.getProductDetails = catchAsyncerrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product
    })
});
//get all revievs of a product
exports.getProductReviews = catchAsyncerrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});
//Delete review 
exports.deleteReview = catchAsyncerrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );
    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    })
    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0
    } else {

        ratings = avg / product.reviews.length;
    }
    const numofReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews: reviews,
        ratings: ratings,
        numofReviews: numofReviews,

    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,

    });
})