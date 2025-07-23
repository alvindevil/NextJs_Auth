import User from "@/models/UserModel";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';

export const sendEmail = async({email, emailType, userId} :any) =>{
    try {
        //create a hashed token 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        //create a transporter 
        if (emailType === "VERIFY") 
        {
            await User.findByIdAndUpdate(userId, 
                {
                    verifyToken: hashedToken, 
                    verifyTokenExpiry: Date.now() + 3600000
                });
        } 
        else if (emailType === "RESET")
        {
            await User.findByIdAndUpdate(userId, 
                {
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }

        //create a transporter
        const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "1e851521d0c3cd",
                    pass: "38d213a45a590e"
                }
        });

        const mailOptions = {
            from: 'yadavs47334@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your account" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", mailResponse);
        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message || "Error in sendEmail function ");        
    }
}
