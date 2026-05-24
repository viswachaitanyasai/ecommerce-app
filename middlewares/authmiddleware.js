import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//to check whether is user registered or not if yes then it will allow to sign or else it just stops or show error
export const requireSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization token is required"
            });
        }
        // Strip "Bearer " prefix if present
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

//to check whether the user is admin or user if admin it will open admin portal
export const isAdmin = async(req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.send({
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