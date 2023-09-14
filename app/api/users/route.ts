import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "@/lib/Request.service";
import { BE_USER } from "@/lib/utils";

export async function GET(request: NextRequest){
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") ?? "";
    const email = searchParams.get("email") ?? "";
    const access_token = request.cookies.get("access_token")?.value;
    const refresh_token = request.cookies.get("refresh_token")?.value
    console.log(`Get users with username =  ${username} and email = ${email}`)
    const responseDto : ResponseDTO = await requestHandler({
        request,
        path: `${BE_USER}?username=${username}&email${email}`,
        method: "GET",
        access_token,
        refresh_token,
    })
    if (responseDto.statusCode === 401) {
        NextResponse.redirect("/login")
    }
    return NextResponse.json(responseDto)    
}