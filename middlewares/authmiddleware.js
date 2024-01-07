import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//to check whether is user registered or not if yes then it will allow to sign or else it just stops or show error
export const requireSignIn = async (req,res,next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

//to check whether the user is admin or user if admin it will open admin portal
export const isAdmin = async(req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"UnAuthorized Access"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            error,
            message:"Error in admin middleware"
        })
    }
}