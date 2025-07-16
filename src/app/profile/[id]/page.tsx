export default function UserProfile({params}:any) 
{
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1>Profile</h1> <br/>
            <p className="text-4xl"> Welcome to your profile! 
            <span className="text-blue-500"> {params.id}</span>
            </p>
        </div>
    )
}

