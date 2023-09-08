import { NextRequest, NextResponse } from "next/server";
import { UserRepo } from "@/BE/users/UserRepo";

export async function GET(request: NextRequest){
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") ?? "";
    const ofc_cd = searchParams.get("ofc_cd") ?? "";

    const retrieveResult: ResponseDTO = UserRepo.getUsers({id, ofc_cd});

    if (retrieveResult.statusCode == 200) {
        return NextResponse.json({
            isSuccessful: true,
            userInfo: retrieveResult.content
        } as {isSuccessful: boolean, userInfo: UserInfo[]})
    } else {
        return NextResponse.json({isSuccessful: false} as RegisterResult)
    }
}