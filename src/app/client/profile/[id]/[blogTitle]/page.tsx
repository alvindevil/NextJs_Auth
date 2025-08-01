'use client'

import axios from "axios"
import React, { useEffect, useState } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"

export default function blogPage( { params } : {params: Promise< {blogTitle : string}>})
{
    const[blogData, setBlogData] = useState<any>(null);
    const {blogTitle: blogTitle } = use(params)
    const router = useRouter();

    

    async function getBlogDetails() {
        try {
            const res = await axios.get(`/api/users/blogs/?title=${blogTitle}`);
            console.log("res data fetched: ", res.data);
            console.log(res.data.blogs.title)
            setBlogData(res.data.blogs);

        } catch (error: any) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getBlogDetails();
    }, []);



    return(
        <>
        <h1> hello blog {blogTitle}</h1>
        <p>blogData </p>
        {
            blogData ? (
                <div>
                    <h2>{blogData.title}</h2>
                    <p>{blogData.content}</p>
                    <p>Author: {blogData.author}</p>
                    <p>Date: {new Date(blogData.date).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading blog details...</p>
            )
        }
        
        </>
    )
}