import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "@/lib/Request.service";
import { BE_PERMISSIONS } from "@/lib/utils";

export async function GET(request: NextRequest) {
    let response: Response;
    try {
        console.log("GET API ROUTE PERMISSIONS")
        response = await requestHandler({
            path: `${BE_PERMISSIONS}`,
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
        response = new Response(JSON.stringify(e.message), { status: 400 })
    }
    return response
}