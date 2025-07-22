import axios from "axios";

export default async function UserProfile({ params }: { params: { id: string } }) {

    const userName =  params.id;
    // console.log("User Name from params.id: ", userName);
    // Here you can fetch user data based on userId if needed

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1>Profile</h1> <br/>
            <p className="text-4xl">
                Welcome to your profile! 
                <span className="text-blue-500">  {userName} </span>
            </p>
        </div>
    );
}
