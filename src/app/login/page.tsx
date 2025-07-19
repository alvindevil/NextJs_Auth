'use client';

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",   
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            const userdata = response.data;
            console.log("Login response: ", response.data);
            console.log("Username ", response.data.username);
            toast.success("Login successful");
            router.push(`/profile/${userdata.username}`); 
        } catch (error:any) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.error || "Login failed");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user.email.length >0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-700 text-white">
            <h1 className="text-2xl font-bold w-fit px-4 py-2 rounded-xl">
                Login
            </h1>
            <br />

            <div className="flex flex-col w-[400px] h-fit border-1 p-10 justify-self-auto backdrop-blur-2xl bg-gray-800 rounded-xl">
                <div className="m-4">
                    <label className="block mb-2" htmlFor="email">Email:</label>
                    <input
                        className="border-2 text-white bg-gray-700 p-2 rounded-xl w-full"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                </div>

                <div className="m-4">
                    <label className="block mb-2" htmlFor="password">Password:</label>
                    <input
                        className="border-2 text-white bg-gray-700 p-2 rounded-xl w-full"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>

                <button
                    onClick={onLogin}
                    className="p-2 m-4 w-full rounded-lg border-2 border-gray-200 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:border-white active:border-white cursor-pointer transition-colors duration-200 text-gray-900"
                >
                {loading ? "Loging in..." : "Login"}
                </button>

                <Link href="/signup" className="text-blue-400 hover:underline mt-2 text-center">
                    Don't have an account? - Signup
                </Link>
            </div>
        </div>
    );
}
