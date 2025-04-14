import mongoose from "mongoose";

export interface User {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' };
    companyDetails: {
        companyName: { type: String },
        address: { type: String },
        description: { type: String },
      },
      contactDetails: {
        phone: { type: String },
    },
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
    companyDetails: {
        companyName: { type: String },
        address: { type: String },
        description: { type: String },
      },
      contactDetails: {
        phone: { type: String },
    },
},{
    timestamps: true,
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);

export default UserModel;