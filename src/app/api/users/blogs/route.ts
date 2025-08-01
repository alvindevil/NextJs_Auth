// /app/api/users/blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/dbConfig/dbConfig";
import Blogs from "@/models/blogModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await getDataFromToken(req);
    const userName = decodedToken.username;
    const userEmail = decodedToken.email;

    const { searchParams } = new URL(req.url);
    const blogTitle = searchParams.get("title");

    let blogs;

    if (blogTitle) {
      // 🎯 Specific blog by title
      console.log("Fetching blog with title:", blogTitle);
      blogs = await Blogs.findOne({ userEmail, title: { $regex: new RegExp(blogTitle, "i") }  });
      console.log("Fetched blog:", blogs);
    } else {
      // 🧾 All blogs for the user
      blogs = await Blogs.find({ user: userName, userEmail });
    }

    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json(
      { success: false, message: "Error fetching blogs" },
      { status: 500 }
    );
  }
}



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

export async function PATCH(req: NextRequest) {
  try {
    const decodedToken = await getDataFromToken(req);
    const userEmail = decodedToken.email;

    const url = new URL(req.url);
    const blogId = url.pathname.split("/").pop();

    const { type } = await req.json();

    if (!blogId) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required" },
        { status: 400 }
      );
    }

    if (!type || !["public", "private"].includes(type)) {
      return NextResponse.json(
        { success: false, message: "Valid type (public/private) is required" },
        { status: 400 }
      );
    }

    const updatedBlog = await Blogs.findOneAndUpdate(
      { _id: blogId, userEmail },
      { type },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (err) {
    console.error("Error updating blog:", err);
    return NextResponse.json(
      { success: false, message: "Error updating blog" },
      { status: 500 }
    );
  }
}
