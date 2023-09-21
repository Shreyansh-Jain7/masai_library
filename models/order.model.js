const mongoose=require("mongoose");
const orderSchema=mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    books : [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }],
    totalAmount: Number
},{
    versionKey:false
})

const Order=mongoose.model("order",orderSchema);

module.exports={Order};