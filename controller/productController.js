import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs"

export const createProductController = async (req,res) => {
    try {
        const {name,description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        switch(true){
            case !name:
                res.status(500).send({error:"name is required"});
            case !price:
                res.status(500).send({error:"price is required"});
            case !description:
                res.status(500).send({error:"description is required"});
            case !category:
                res.status(500).send({error:"category is required"});
            case !quantity:
                res.status(500).send({error:"quantity is required"});
            case photo && photo.size > 1000000:
                res.status(500).send({error:"photo is required and should be less than 1mb"});
        }

        const products = new productModel({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Products Created Successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:false,
            message:"Error in Creating products",
            error
        })
    }
}

export const getProductController = async (req,res) => {
    try {
        const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            totalCount: products.length,
            message:"All products",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in while getting products",
            error:error.message
        })
    }
}

export const getSingleProductController = async (req,res) => {
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            message:"Single product",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in while getting single product",
            error
        })
    }
}

export const productPhotoController = async (req,res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in while getting product photo",
            error
        })
    }
}

export const deleteProductController = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"Product deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in deleting products",
            error
        })
    }
}

export const updateProductController = async (req,res) => {
    try {
        const {name,description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        switch(true){
            case !name:
                res.status(500).send({error:"name is required"});
            case !price:
                res.status(500).send({error:"price is required"});
            case !description:
                res.status(500).send({error:"description is required"});
            case !category:
                res.status(500).send({error:"category is required"});
            case !quantity:
                res.status(500).send({error:"quantity is required"});
            case photo && photo.size > 1000000:
                res.status(500).send({error:"photo is required and should be less than 1mb"});
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)}, {new:true}
        )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Products Updated Successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:false,
            message:"Error in Updating products",
            error
        })
    }
}

export const productFilterController = async (req,res) =>{
    try {
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = {$gte:radio[0], $lte:radio[1]};
        const products = await productModel.find(args);
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in filering Products",
            error
        })
    }
}

export const productCountController = async (req,res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in counting Products",
            error
        })
    }
}

export const productListController = async (req,res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in listing products"
        })
    }
}