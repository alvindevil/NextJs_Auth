'use client'
import { useRouter } from "next/navigation";



export default function Home() {

  const router = useRouter();

  function openLogin() 
  {
    router.push('./login');
  }
  function openSignup() 
  {
    router.push('./signup');
  }

  return (
    <div className="bg-gray-500 h-[200vh] text-white">
      <h1> Get started </h1>
      <button 
      onClick={openLogin}
      className="block cursor-pointer"> Login </button>
      <button 
      onClick={openSignup}
      className="block cursor-pointer "> Singup  </button>
    </div>
  );
}
