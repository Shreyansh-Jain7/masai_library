const express=require("express");
const orderRouter=express.Router();
const {Book}=require("../models/book.model");
const {User}=require("../models/user.model");
const {Order}=require("../models/order.model")
const jwt=require("jsonwebtoken");

orderRouter.post("/order",async (req,res)=>{
    const decoded=jwt.verify(req.headers.authorization,"secretkey");
    const _id=decoded.userId;

    try {
        const user=await User.find({_id});
        if(user.length>0){
            const order=new Order({user:_id,...req.body});
            await order.save();
            res.status(201).send({"msg":"order has been added"});
        }else{
            res.status(400).send({"msg":"You have to login to order"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

orderRouter.get("/orders",async (req,res)=>{
    const decoded=jwt.verify(req.headers.authorization,"secretkey");
    const _id=decoded.userId;

    try {
        const user=await User.find({_id});
        if(user.length>0 && user[0].isAdmin){
            const orders=await Order.find().populate("user").populate("books");
            res.status(200).send(orders);
        }else{
            res.status(400).send({"msg":"You have to be an admin to see all orders"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

module.exports={orderRouter};