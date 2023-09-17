import { NextRequest } from "next/server";
import { BE_AUTH_LOGIN } from "@/lib/utils";
import { requestHandler } from "@/lib/Request.service";
import { setTokens } from "@/lib/Response.service";


export async function POST(request: NextRequest) {
    let response: Response;
    try {
        const { email, password, expires}: LoginDto = await request.json();
        console.log(`login with email : ${email} and password ${password}`)
        response = await requestHandler({
            path: BE_AUTH_LOGIN,
            method: "POST",
            payload: {email, password},
            isTokenRequired: false,
        });
        
        switch (response.status) {
            case 200:
                const { content, errors, hasErrors} : ResponseDTO & { access_token: string, refresh_token: string } = await response.json();
                const { access_token, refresh_token, ...userInfo} = content as {access_token: string, refresh_token: string}
                setTokens(access_token, refresh_token, expires)
                return new Response(JSON.stringify({hasErrors,  errors, content: userInfo}), {status: 200, headers: response.headers})
            default:
                return response;
        }
    } catch (e: any) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        return new Response(JSON.stringify(e.message), {status: 400})
    }
}