import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "@/lib/Request.service";
import { BE_USER } from "@/lib/utils";

export async function GET(request: NextRequest) {
    let response : Response;
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username") ?? "";
        const email = searchParams.get("email") ?? "";
        console.log(`Get users with username =  ${username} and email = ${email}`)
        response = await requestHandler({
            path: `${BE_USER}?username=${username}&email=${email}`,
            method: "GET",
            isTokenRequired: true,
        })
        if (response.status === 401) {
            NextResponse.redirect("/login")
        }
    } catch (e: any) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        response = new Response(JSON.stringify(e.message), {status: 400})
    }
    return response
}