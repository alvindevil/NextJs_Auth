import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import env, { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

connect();

export async function POST(request : NextRequest) {
    try {
        
        const reqBody = await request.json();
        const {email, password} =  reqBody;
        console.log("reqBody: ", reqBody);
        
        //check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        //check if password is correct
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            console.log("Invalid Password");
            return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
        }
        //if error comes try changing brcypt import 

        //now lets create a token data 
        const tokenData = {
            id: user._id,   //as the id starting with _ in mongoAtlas
            email: user.email,
            name: user.name
        };
    
        //create a token 
        const token =  jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET! as string, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            username: user.username,
        });
        
        response.cookies.set('token', token, {
            httpOnly: true,
        });

        return response;



    } catch (error: any ) {
        return NextResponse.json({success : false ,message :error.message || "Error most probably in api/login-> route.ts file , hehe thnkx "}, {status: 500});
    }
    
}