import { NextRequest, NextResponse } from "next/server";
import { BE_AUTH_LOGIN } from "@/lib/utils";
import { requestHandler } from "@/lib/Request.service";

export async function POST(request: NextRequest) {
    let loginResult: LoginResult | null = null;
    try {
        const { email, password }: LoginDto = await request.json();
        console.log("login")
        const { content, errors, statusCode }: ResponseDTO = await requestHandler({
            request,
            path: BE_AUTH_LOGIN,
            method: "POST",
            payload: {email, password},
        });
        switch (statusCode) {
            case 200:
                const { access_token, refresh_token, ...userInfo } = content as UserInfo & { access_token: string, refresh_token: string }
                loginResult = {
                    isSuccessful: true,
                    userInfo: userInfo,
                    access_token,
                    refresh_token,
                }
                break;
            default:
                loginResult = {
                    isSuccessful: false,
                    error: errors.toString()
                }
        }
    } catch (e: any) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        loginResult = {
            isSuccessful: false,
            error: e.message as string
        }
    }
    return NextResponse.json(loginResult)
}