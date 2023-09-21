const express=require("express");
const bookRouter=express.Router();
const {Book}=require("../models/book.model");
const {User}=require("../models/user.model");
const jwt=require("jsonwebtoken");

bookRouter.get("/",async(req,res)=>{
    // let author=req.query.author;
    // let category=req.query.category;
    try {
        const books=await Book.find(req.query);
        res.status(200).send(books);
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

bookRouter.get("/:id",async(req,res)=>{
    try {
        const books=await Book.find({_id:req.params.id});
        res.status(200).send(books);
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

bookRouter.post("/",async(req,res)=>{
    const decoded=jwt.verify(req.headers.authorization,"secretkey");
    const _id=decoded.userId;

    try {
        const user=await User.find({_id});
        if(user.length>0 && user[0].isAdmin){
            const book=new Book(req.body);
            await book.save();
            res.status(201).send({"msg":"book has been added"});
        }else{
            res.status(400).send({"msg":"You have to be an admin to add a book"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

bookRouter.patch("/:id",async(req,res)=>{
    const decoded=jwt.verify(req.headers.authorization,"secretkey");
    const _id=decoded.userId;

    try {
        const user=await User.find({_id});
        if(user.length>0 && user[0].isAdmin){
            await Book.findByIdAndUpdate({_id:req.params.id},req.body);
            res.status(204).send({"msg":"book has been updated"});
        }else{
            res.status(400).send({"msg":"You have to be an admin to update a book"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

bookRouter.delete("/:id",async(req,res)=>{
    const decoded=jwt.verify(req.headers.authorization,"secretkey");
    const _id=decoded.userId;

    try {
        const user=await User.find({_id});
        if(user.length>0 && user[0].isAdmin){
            await Book.findByIdAndDelete({_id:req.params.id});
            res.status(202).send({"msg":"book has been deleted"});
        }else{
            res.status(400).send({"msg":"You have to be an admin to delete a book"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})


module.exports={bookRouter}