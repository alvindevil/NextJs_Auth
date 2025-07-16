'use client';

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function SignupPage() {

    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })

    const onSignUp = async()=>{

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-700 text-white">
            <h1 className="text-2xl font-bold  w-fit px-4 py-2 border-2 border-gray-500 rounded-xl"> Signup </h1>
            <br/>

            <div className="flex flex-col w-[400px] h-fit border-1 p-10 justify-self-auto backdrop-blur-2xl bg-gray-800 rounded-xl ">
                <div className="m-4">
                    <label className="block mb-2 " htmlFor="username"> Username : </label>
                    <input
                        className="border-2 text-white  p-2 rounded-xl w-full"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="username"
                    />
                </div>

                <div className="m-4">
                    <label className="block mb-2" htmlFor="username"> email : </label>
                    <input
                        className="border-2 text-white  p-2 rounded-xl w-full"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                </div>

                <div className="m-4">
                    <label className="block mb-2" htmlFor="username"> password : </label>
                    <input
                        className="border-2 text-white  p-2 rounded-xl w-full"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>
                
                <button
                onClick={onSignUp}
                className="p-2 m-4  w-full  rounded-lg border-2 border-gray-200 bg-gray-300 
             hover:bg-gray-400 focus:outline-none focus:border-white active:border-white 
             cursor-pointer transition-colors duration-200 text-gray-900
                "> 
                    SingUp 
                </button>
                <Link href="/login" className="text-blue-400 hover:underline mt-2 text-center"> 
                Already account? -Login page 
                </Link>
            </div>
            

            
            
        </div>
    )
}