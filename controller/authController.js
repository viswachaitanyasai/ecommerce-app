import userModel from "../models/userModel.js";
import {comparePassword, hashPassword} from "./../helper/authHelper.js";
import JWT from "jsonwebtoken";

//route to register in the mongodb from user
export const registerController = async (req,res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body;
        if(!name){
            return res.send({message:"Name is Required"})
        }
        if(!email){
            return res.send({message:"Email is Required"})
        }
        if(!password){
            return res.send({message:"Password is Required"})
        }
        if(!phone){
            return res.send({message:"Phone is Required"})
        }
        if(!address){
            return res.send({message:"Address is Required"})
        }
        if(!answer){
            return res.send({message:"Answer is Required"})
        }
        //check user
        const existingUser = await userModel.findOne({email});
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already registred please login"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save();

        res.status(201).send({
            success:true,
            message:"User Register Successful",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error in the registration",
            error
        })
    }
}

//route to login for user by checking from mongodb
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }

        const match = await comparePassword(password,user.password);

        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });

        res.status(200).send({
            success:true,
            message:"LogIn successfull",
            user:{
                name:user.name,
                email:user.name,
                phone:user.phone,
                address:user.address,
                role: user.role
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in the Log in",
            error
        })
    }
}

//forgot password controller
export const forgotPasswordController = async (req,res) => {
    try {
        const {email, answer, newPassword} = req.body;
        if(!email){
            res.status(400).send({message:"Email is required"});
        }
        if(!answer){
            res.status(400).send({message:"Answer is required"});
        }
        if(!newPassword){
            res.status(400).send({message:" New Password is required"});
        }
        //check in db
        const user = await userModel.findOne({email,answer});
        if(!user){
            res.status(404).send({
                success:false,
                message:"Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }
}

//test Controller

export const testController = (req,res) => {
    res.send("protected route");
}
