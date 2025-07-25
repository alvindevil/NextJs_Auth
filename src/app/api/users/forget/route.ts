import { sendEmail } from "@/helpers/mailer";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export  async function GET() {
    return NextResponse.json({ message: "forget route is working , only for testing " }, { status: 200 });
}

export async function POST(request: NextRequest)
{
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        const user = await  User.findOne({email:email});
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        else{
            await sendEmail({
                email: user.email,
                emailType: "RESET",
                userId: user._id
            });

            return NextResponse.json({
                message: "Reset password email sent successfully",
                success: true
            }, {status: 200});
        }
        
    } catch (error: any) {
        return NextResponse.json({message: "Error ", error: error.message})
    }
}
