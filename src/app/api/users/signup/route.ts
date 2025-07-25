import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";


connect();

export async function GET() {
    return NextResponse.json({ message: "Backend is working!" }, { status: 200 });
}

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log("Received data:", reqBody);

        console.log("1 come here ");
        //check if user already in db
        const user = await  User.findOne({email:email});
        if (user){
            return NextResponse.json({error: "User already exists"}, 
                {status: 400});
            }
            console.log("2 come here ");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
        console.log("3 come here ");
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("User Saved successfully:", savedUser);

        
        await sendEmail({
            email: savedUser.email,
            emailType: "VERIFY",
            userId: savedUser._id
        })

        return NextResponse.json({
            message: "User created successfully",
            success:true,
            savedUser
    }, {status: 201});

    
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
}

}
