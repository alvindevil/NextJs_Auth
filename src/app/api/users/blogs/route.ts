// /app/api/users/blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/dbConfig/dbConfig";
import Blogs from "@/models/blogModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const decodedToken = await getDataFromToken(req);
    console.log("Decoded token:", decodedToken);
    const userName = decodedToken.username;
    const userEmail = decodedToken.email;
    console.log("User Name from token:", userName);
    console.log("User Email from token:", userEmail);

    

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File | null;
    let imageUrl = "";
    if (image && typeof image === "object" && "name" in image) {
        imageUrl = image.name; 
    }


    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and content are required" },
        { status: 400 }
      );
    }

    const newBlog = await Blogs.create({
      user: userName,
      userEmail: userEmail,
      title,
      content,
      imageUrl,
      type: "private", 
    });

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json(
      { success: false, message: "Error creating blog" },
      { status: 500 }
    );
  }
}
