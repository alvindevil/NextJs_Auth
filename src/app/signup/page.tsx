'use client';

import Link from "next/link";
import React, { use } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import toast from "react-hot-toast";
import { log } from "console";


export default function SignupPage() {

    const router = useRouter();

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const[loading, setLoading] = React.useState(false); 

    const [user,setUser] = React.useState({
        username :"",
        email :"",
        password:"",
    })


    const onSignUp = async()=>{
        try {
            setLoading(true);
            console.log("Signing up:", user.username);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Done and here is data which is send :", response);
            router.push('/login');
        } 
        catch (error : any) {
            console.log("Signup failed", error.message);
            toast.error(error.message );
        }

        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length >0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user.username, user.email, user.password]);

    // Function to test GET request to backend
    const testBackend = async () => {
        try {
            const res = await axios.get('/api/users/signup');
            toast.success(res.data.message || 'Backend is working!');
            console.log(res.data);
        } catch (err: any) {
            toast.error('Backend test failed');
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-700 text-white">
            <h1 className="text-2xl font-bold  w-fit px-4 py-2 rounded-xl"> Signup </h1>
            <button
                onClick={testBackend}
                className="mb-4 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 text-white"
            >
                Test Backend
            </button>
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
                    className={`p-2 m-4 w-full rounded-lg border-2 border-gray-200 bg-gray-300
                        hover:bg-gray-400 focus:outline-none focus:border-white active:border-white
                        transition-colors duration-200 text-gray-900 
                        ${buttonDisabled ? "cursor-not-allowed " : "cursor-pointer"}`}
                    disabled={buttonDisabled}
                >
                    {loading ? (
                        <div className="flex space-x-1">
                            <h3>Loading</h3>
                    <span className="animate-bounce-dot delay-0">.</span>
                    <span className="animate-bounce-dot delay-200">.</span>
                    <span className="animate-bounce-dot delay-400">.</span>
                    </div>
                    ) 
                    : 
                    (buttonDisabled ? "No Signup " : "Signup")}
                </button>

                <Link href="/login" className="text-blue-400 hover:underline mt-2 text-center"> 
                Already account? -Login page 
                </Link>
            </div>
        </div>
    )
}