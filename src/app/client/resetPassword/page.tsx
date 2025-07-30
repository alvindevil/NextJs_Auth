"use client"

import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function ResetPasswordPage() {
    const router = useRouter();
    const [newpassword, setnewPassword] = useState("");
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyresetpassword = async () => {
            try {
                const response = await axios.post('/api/users/updatePassword', {token, newpassword})
                if (response.data.message) {
                    alert(response.data.message);
                    setVerified(true);
                    router.push("/client/login");
                }
            } catch (error:any) {
                setError(true);
                console.log(error.message);
            }
    
        }
    
        useEffect(() => {
            const urlToken = window.location.search.split("=")[1];
            setToken(urlToken || "");
        }, []);

        // useEffect(() => {
        //         if(token.length > 0) {
        //             verifyresetpassword();
        //         }
        //     }, [token]);


    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Change Password</h2>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            New Password
            </label>
            <input
            id="password"
            type="password"
            value={newpassword}
            onChange={e => setnewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-6"
            placeholder="Enter new password"
            />
            <button
            onClick={verifyresetpassword}
            type="button"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
            Update Password
            </button>
        </div>
    );
}