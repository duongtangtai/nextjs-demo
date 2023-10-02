import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "@/lib/Request.service";
import { BE_USER_CHANGE_PASSWORD } from "@/lib/utils";

export async function POST(request: NextRequest) {
    console.log("API FE CALLED TO CHANGE PASSWORD")
    let response: Response;
    try {
        const { userId, currentPassword, newPassword, confirmNewPassword} = await request.json();
        response = await requestHandler({
            path: `${BE_USER_CHANGE_PASSWORD}`,
            method: "POST",
            payload: {
                userId,
                currentPassword,
                newPassword,
                confirmNewPassword,
            },
            isTokenRequired: true,
        })
        if (response.status === 401) {
            NextResponse.redirect("/login")
        }
    } catch (e: any) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        response = new Response(JSON.stringify(e.message), { status: 400 })
    }
    return response
}
