import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { newpassword, token } = reqBody;
        console.log("Token received:", token);
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
        
        
        if (!user) {
            return NextResponse.json({error: "invalid Token"}, {status: 400});
        }
        
        user.password = await bcrypt.hash(newpassword, 10);
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        console.log("Password updated successfully for user:", user.email);
        return NextResponse.json({message: "Password updated successfully"}, {status: 200});
    } 
    catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500});     
    }
}