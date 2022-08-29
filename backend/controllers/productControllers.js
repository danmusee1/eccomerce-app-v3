const Product= require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchasyncErrors= require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//create product
exports.createProduct= catchasyncErrors(async (req,res,next)=>{
    const product= await Product.create(req.body);
    res.status(201).json({
        success:true,
        product,
    })
});

//GET ALL PRODUCTS
exports.getAllProducts= catchasyncErrors(async(req,res,next)=>{

   const apiFeature=new ApiFeatures(Product.find(),req.query)
   .search()
   .filter();
    const products= await apiFeature.query;

    
    res.status(200).json({
        success:true,
        products,
    })
});

//update product --admin

exports.updateProduct=catchasyncErrors(async(req,res,next)=>{
    let product= await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    product= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
});

//GET PRODUCT DETAILS
exports.getProductDetails=catchasyncErrors(async(req,res,next)=>{
    const product= await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }
    res.status(200).json({
        success:true,
        product
})
})

//DELETE PRODUCTS

exports.deleteProducts=catchasyncErrors(async(req,res,next)=>{
    const product= await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }
    await product.remove();
res.status(200).json({
    success:true,
    message: "Product deleted Successfully",
})
})
