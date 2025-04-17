import mongoose from "mongoose";


export interface Product{
    _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    sellerId: mongoose.Types.ObjectId;
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const productSchema= new mongoose.Schema<Product>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    sellerId: { type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }],
},
    { timestamps: true, })

