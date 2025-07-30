import mongoose from "mongoose";
import { type } from "os";

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    userEmail :{
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["public", "private"],
      default: "private",
      required: true,
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);

export default Blogs;
