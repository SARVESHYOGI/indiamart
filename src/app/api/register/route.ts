import { db } from "@/lib/db";
import User from "@/models/User.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    await db();
    
    try{
        const { username, email, password , role } =await request.json();
        if (!username || !email || !password || !role) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        const userFound=await User.findOne({email});
        if(userFound){
            return NextResponse.json({message:"User already exists"}, {status:409});
        }
        const hashedPassword=await bcrypt.hash(password, 10);
        const newUser=await User.create({username, email, password:hashedPassword, role});
        if(!newUser){
            return NextResponse.json({message:"User not created"}, {status:500});
        }
        return NextResponse.json({message:"User created successfully", newUser}, {status:201});

    }catch(err){
           return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}