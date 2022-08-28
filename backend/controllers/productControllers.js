const Product= require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

//create product
exports.createProduct=async (req,res,next)=>{
    const product= await Product.create(req.body);
    res.status(201).json({
        success:true,
        product,
    })
};

//GET ALL PRODUCTS
exports.getAllProducts=async(req,res,next)=>{
    const products= await Product.find();

    
    res.status(200).json({
        success:true,
        products,
    })
}

//update product --admin

exports.updateProduct=async(req,res,next)=>{
    let product= await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message: "Product not found",
        })
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
}

//GET PRODUCT DETAILS
exports.getProductDetails=async(req,res,next)=>{
    const product= await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }
    res.status(200).json({
        success:true,
        product
})
}

//DELETE PRODUCTS

exports.deleteProducts=async(req,res,next)=>{
    const product= await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message: "Product not found",
        })
    }
    await product.remove();
res.status(200).json({
    success:true,
    message: "Product deleted Successfully",
})
}
