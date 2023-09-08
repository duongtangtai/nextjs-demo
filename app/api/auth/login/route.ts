import { NextRequest, NextResponse } from "next/server";
import { AuthRepo } from "@/BE/auth/AuthRepo";

export async function POST(request: NextRequest){

    const { email, password } = await request.json();
    const loginResult: ResponseDTO = AuthRepo.login({email, password});
    if (loginResult.statusCode == 200) {
        return NextResponse.json({
            isSuccessful: true,
            userInfo: loginResult.content
        } as LoginResult)
    } else {
        return NextResponse.json({isSuccessful: false} as LoginResult)
    }
}