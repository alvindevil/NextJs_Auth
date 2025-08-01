'use client'

import axios from "axios"
import React, { useEffect } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"

export default function blogPage( { params } : {params: Promise< {blogTitle : string}>})
{
    const {blogTitle: blogTitle } = use(params)
    const router = useRouter();

    

    async function getBlogDetails() {
        try {
            const blogData = await axios.get(`/api/users/blogs/?title=${blogTitle}`);
            console.log("Blog data fetched: ", blogData.data);


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
        
        </>
    )
}