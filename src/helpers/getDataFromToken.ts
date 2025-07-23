import { NextRequest } from "next/server";
import jwt  from "jsonwebtoken";
import env, { configDotenv } from "dotenv";

configDotenv();

export const  getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.JWT_TOKEN_SECRET! as string);
        return decodedToken;
        
    } catch (error:any) {
        throw new Error(error.message || "Error in getDataFromToken function");
    }
}