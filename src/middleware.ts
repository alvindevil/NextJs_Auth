import { NextResponse } from 'next/server';
import type {NextRequest} from 'next/server';
import Jwt  from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log("Middleware is running for path:", path);
    console.log("Request cookies:", request.cookies.get('token')?.value);
    console.log(" decode cookies: ", Jwt.decode(request.cookies.get('token')?.value || ''));

    
    // console.log("Decoded data:", typeof(data));
    // // console.log("username : " , data?.username || 'No username found');    --- this way can work in simple js or jsx file but not in ts , typescript , bcz ts cannot guarantee everytime the data will be object , stirng or null 
    // console.log("username : ", typeof data === 'object' && data !== null && 'username' in data ? (data as any).username : 'No username found');
    
    const data = Jwt.decode(request.cookies.get('token')?.value || '');

    if(data && typeof data === 'object' && 'username' in data)
    {
        var usernameUrl = data?.username;
    }

    console.log("usernameUrl to redirect is :", usernameUrl);

    const isPublicPath = path === '/login' || path === '/signup' ; //just to set a variable as true or false ,if PublicPath is true then only goto that route 
    
    //now lets get token from coockies
    const token = request.cookies.get('token')?.value;

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL(`/profile/${usernameUrl}`, request.nextUrl));
    }
    
    

}

//routes on which middleware will run on 
export const config = {
    matcher: [
        '/login',
        '/signup',  
    ]
}






