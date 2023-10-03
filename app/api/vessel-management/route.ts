import { requestHandler } from "@/lib/Request.service";
import { BE_VESSEL_MANAGEMENT } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    let response: Response;
    try {
        console.log("FE received:")
        const { searchParams } = new URL(request.url);
        const vslCd = searchParams.get("vslCd") ?? "";
        console.log("vslCd: " + vslCd)
        response = await requestHandler({
            path: `${BE_VESSEL_MANAGEMENT}?vslCd=${vslCd}`,
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