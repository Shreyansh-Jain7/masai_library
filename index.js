const express=require("express");
const app=express();
const {connection}=require("./db");
const {userRouter}=require("./routes/user.routes");
const {bookRouter}=require("./routes/book.routes");
const {orderRouter}=require("./routes/order.routes");
const cors=require("cors");
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to Masai Library");
})
app.use("/api",userRouter);

app.use("/api/books",bookRouter);

app.use("/api",orderRouter);


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`Connected to mongoDB Atlas`);
        console.log(`Running the server at port ${process.env.port}`);
    } catch (err) {
        console.log(err);
    }
})