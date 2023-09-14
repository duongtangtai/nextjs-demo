import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    console.log("middleware.....")
    const session = await getToken({ req: request, secret: process.env.JWT_SECRET });//get session for google login
    if (!session && !request.cookies.get("userInfo")) {
        console.log("session is null")
        request.cookies.delete(["access_token", "refresh_token"])
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
    console.log(request.url)
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
    ]
}