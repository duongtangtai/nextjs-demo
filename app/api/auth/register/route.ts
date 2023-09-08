import { NextRequest, NextResponse } from "next/server";
import { AuthRepo } from "@/BE/auth/AuthRepo";

export async function POST(request: NextRequest){

    const { email, password, username} = await request.json();
    const registerResult: ResponseDTO = AuthRepo.register({email, password, username});
    if (registerResult.statusCode == 200) {
        return NextResponse.json({
            isSuccessful: true,
            userInfo: registerResult.content
        } as RegisterResult)
    } else {
        return NextResponse.json({isSuccessful: false} as RegisterResult)
    }
}