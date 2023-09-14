import { NextRequest, NextResponse } from "next/server";
import { BE_AUTH_REGISTER } from "@/lib/utils";
import { requestHandler } from "@/lib/Request.service";

export async function POST(request: NextRequest) {
    console.log("Register")
    const { email, password, username } = await request.json();
    const responseDto : ResponseDTO = await requestHandler({
        request,
        path: BE_AUTH_REGISTER,
        method: "POST",
        payload: { email, password, username },
    })
    return NextResponse.json(responseDto)
}